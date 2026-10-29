import pool from '../config/db.js';
import { normalizarTitulo } from '../utils/normalizar.js';

const selectPeliculas = `
  SELECT p.id,p.titulo,p.descripcion,p.tipo,p.anio,p.duracion_minutos,
    p.categoria_id,c.nombre AS categoria_nombre,p.director_id,d.nombre AS director_nombre,
    p.imagen_url,p.trailer_url,p.estado,p.rating_promedio,p.total_resenas,p.created_at,
    ROUND(CASE WHEN COALESCE(rs.total_resenas,0)=0 THEN 0 ELSE
      0.8*((rs.total_resenas/(rs.total_resenas+3))*rs.promedio+(3/(rs.total_resenas+3))*5)
      +0.1*(10*(rs.likes+1)/(rs.likes+rs.dislikes+2))
      +0.1*(5+5*rs.recencia)
    END,2) AS score_ponderado
  FROM peliculas p
  JOIN categorias c ON c.id=p.categoria_id
  LEFT JOIN directores d ON d.id=p.director_id
  LEFT JOIN (
    SELECT pelicula_id,COUNT(*) AS total_resenas,AVG(calificacion) AS promedio,
      SUM(likes) AS likes,SUM(dislikes) AS dislikes,
      AVG(EXP(-GREATEST(TIMESTAMPDIFF(DAY,created_at,UTC_TIMESTAMP()),0)/180)) AS recencia
    FROM resenas GROUP BY pelicula_id
  ) rs ON rs.pelicula_id=p.id
`;

async function guardarDirector(connection, nombre) {
  if (!nombre?.trim()) return null;
  const [result] = await connection.query(
    'INSERT INTO directores(nombre) VALUES(?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)',
    [nombre.trim()]
  );
  return result.insertId;
}

async function guardarActores(connection, peliculaId, nombres) {
  for (const nombre of nombres || []) {
    const [actor] = await connection.query(
      'INSERT INTO actores(nombre) VALUES(?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)',
      [nombre.trim()]
    );
    await connection.query('INSERT IGNORE INTO pelicula_actor(pelicula_id,actor_id) VALUES(?,?)', [
      peliculaId,
      actor.insertId
    ]);
  }
}

export const PeliculaModel = {
  async existeAprobada(id) {
    const [rows] = await pool.query("SELECT id FROM peliculas WHERE id=? AND estado='aprobada'", [
      id
    ]);
    return rows.length > 0;
  },

  async listar({
    page = 1,
    limit = 20,
    categoria_id,
    q,
    orden = 'ranking',
    estado = 'aprobada'
  } = {}) {
    const conditions = ['p.estado=?'];
    const values = [estado];
    if (categoria_id) {
      conditions.push('p.categoria_id=?');
      values.push(categoria_id);
    }
    if (q) {
      conditions.push('p.titulo LIKE ?');
      values.push(`%${q}%`);
    }

    const orderBy =
      {
        ranking: 'score_ponderado DESC,p.total_resenas DESC',
        popularidad: 'p.total_resenas DESC,p.rating_promedio DESC',
        recientes: 'p.created_at DESC',
        titulo: 'p.titulo ASC'
      }[orden] || 'p.rating_promedio DESC,p.total_resenas DESC';

    const where = conditions.join(' AND ');
    const [[count]] = await pool.query(
      `SELECT COUNT(*) AS total FROM peliculas p WHERE ${where}`,
      values
    );
    const offset = (page - 1) * limit;
    const [items] = await pool.query(
      `${selectPeliculas} WHERE ${where} ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
      [...values, limit, offset]
    );

    return {
      items,
      pagination: {
        page,
        limit,
        total: count.total,
        totalPages: Math.ceil(count.total / limit)
      }
    };
  },

  async obtener(id) {
    const [rows] = await pool.query(`${selectPeliculas} WHERE p.id=?`, [id]);
    if (!rows[0]) return null;

    const [actores] = await pool.query(
      `SELECT a.id,a.nombre
       FROM pelicula_actor pa
       JOIN actores a ON a.id=pa.actor_id
       WHERE pa.pelicula_id=?
       ORDER BY a.nombre`,
      [id]
    );
    return { ...rows[0], actores };
  },

  async crear(datos, usuarioId) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      const directorId = await guardarDirector(connection, datos.director);
      const [result] = await connection.query(
        `INSERT INTO peliculas
         (titulo,titulo_normalizado,descripcion,duracion_minutos,tipo,anio,categoria_id,
          director_id,imagen_url,trailer_url,estado,creado_por)
         VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          datos.titulo.trim(),
          normalizarTitulo(datos.titulo),
          datos.descripcion.trim(),
          datos.duracion_minutos || null,
          datos.tipo,
          datos.anio,
          datos.categoria_id,
          directorId,
          datos.imagen_url || null,
          datos.trailer_url || null,
          'pendiente',
          usuarioId
        ]
      );
      await guardarActores(connection, result.insertId, datos.actores);
      await connection.commit();
      return result.insertId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async actualizar(id, datos) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      const [existing] = await connection.query('SELECT id FROM peliculas WHERE id=? FOR UPDATE', [
        id
      ]);
      if (!existing.length) {
        await connection.rollback();
        return false;
      }
      const directorId = await guardarDirector(connection, datos.director);
      const [result] = await connection.query(
        `UPDATE peliculas SET titulo=?,titulo_normalizado=?,descripcion=?,
         duracion_minutos=?,tipo=?,anio=?,categoria_id=?,director_id=?,imagen_url=?,trailer_url=?
         WHERE id=?`,
        [
          datos.titulo.trim(),
          normalizarTitulo(datos.titulo),
          datos.descripcion.trim(),
          datos.duracion_minutos || null,
          datos.tipo,
          datos.anio,
          datos.categoria_id,
          directorId,
          datos.imagen_url || null,
          datos.trailer_url || null,
          id
        ]
      );
      if (datos.actores) {
        await connection.query('DELETE FROM pelicula_actor WHERE pelicula_id=?', [id]);
        await guardarActores(connection, id, datos.actores);
      }
      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async cambiarEstado(id, estado, adminId) {
    const [existing] = await pool.query('SELECT id FROM peliculas WHERE id=?', [id]);
    if (!existing.length) return false;
    await pool.query('UPDATE peliculas SET estado=?,aprobado_por=? WHERE id=?', [
      estado,
      estado === 'aprobada' ? adminId : null,
      id
    ]);
    return true;
  },

  async eliminar(id) {
    const [result] = await pool.query('DELETE FROM peliculas WHERE id=?', [id]);
    return result.affectedRows > 0;
  }
};
