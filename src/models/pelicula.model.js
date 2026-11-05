import { BaseModel } from './base.model.js';
import { Pelicula } from '../entities/Pelicula.js';

export class PeliculaModel extends BaseModel {
  async obtenerOCrearDirector(nombre) {
    if (!nombre || !nombre.trim()) return null;
    const nombreLimpio = nombre.trim();
    const [existente] = await this.query('SELECT id FROM directores WHERE nombre = ?', [nombreLimpio]);
    if (existente.length > 0) {
      return existente[0].id;
    }
    const [nuevo] = await this.query('INSERT INTO directores (nombre) VALUES (?)', [nombreLimpio]);
    return nuevo.insertId;
  }

  async crear({
    titulo,
    tituloNormalizado,
    descripcion,
    duracionMinutos,
    tipo,
    anio,
    categoriaId,
    directorId,
    imagenUrl,
    creadoPor,
    estado = 'pendiente'
  }) {
    const [result] = await this.query(
      `INSERT INTO peliculas 
        (titulo, titulo_normalizado, descripcion, duracion_minutos, tipo, anio, categoria_id, director_id, imagen_url, creado_por, estado) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        titulo,
        tituloNormalizado,
        descripcion,
        duracionMinutos || null,
        tipo,
        anio,
        categoriaId,
        directorId || null,
        imagenUrl || null,
        creadoPor || null,
        estado
      ]
    );
    return result.insertId;
  }

  async buscarPorTituloNormalizado(tituloNormalizado) {
    const [rows] = await this.query('SELECT * FROM peliculas WHERE titulo_normalizado = ?', [tituloNormalizado]);
    if (rows.length === 0) return null;
    return new Pelicula(rows[0]);
  }

  async buscarPorId(id) {
    const [rows] = await this.query(
      `SELECT p.*, c.nombre as categoria_nombre, d.nombre as director_nombre 
       FROM peliculas p 
       LEFT JOIN categorias c ON p.categoria_id = c.id 
       LEFT JOIN directores d ON p.director_id = d.id 
       WHERE p.id = ?`,
      [id]
    );
    if (rows.length === 0) return null;
    return new Pelicula(rows[0]);
  }

  async listarAprobadas({ categoria, orden, busqueda, limit, page } = {}) {
    let sql = `
      SELECT p.*, c.nombre as categoria_nombre, d.nombre as director_nombre 
      FROM peliculas p 
      LEFT JOIN categorias c ON p.categoria_id = c.id 
      LEFT JOIN directores d ON p.director_id = d.id 
      WHERE p.estado = 'aprobada'
    `;
    const params = [];

    if (categoria) {
      if (isNaN(categoria)) {
        sql += ` AND c.nombre = ?`;
        params.push(categoria);
      } else {
        sql += ` AND p.categoria_id = ?`;
        params.push(Number(categoria));
      }
    }

    if (busqueda && busqueda.trim()) {
      sql += ` AND (p.titulo LIKE ? OR p.descripcion LIKE ? OR d.nombre LIKE ?)`;
      const term = `%${busqueda.trim()}%`;
      params.push(term, term, term);
    }

    if (orden === 'recientes') {
      sql += ` ORDER BY p.created_at DESC`;
    } else if (orden === 'popularidad') {
      sql += ` ORDER BY p.total_resenas DESC, p.rating_promedio DESC`;
    } else {
      sql += ` ORDER BY p.rating_promedio DESC, p.total_resenas DESC`;
    }

    const maxLimit = limit ? Math.min(Number(limit), 100) : 50;
    if (page && Number(page) > 1) {
      const offset = (Number(page) - 1) * maxLimit;
      sql += ` LIMIT ? OFFSET ?`;
      params.push(maxLimit, offset);
    } else {
      sql += ` LIMIT ?`;
      params.push(maxLimit);
    }

    const [rows] = await this.query(sql, params);
    return rows.map((row) => new Pelicula(row));
  }

  async listarPendientes() {
    const [rows] = await this.query(
      `SELECT p.*, c.nombre as categoria_nombre, d.nombre as director_nombre, u.email as creado_por_email 
       FROM peliculas p 
       LEFT JOIN categorias c ON p.categoria_id = c.id 
       LEFT JOIN directores d ON p.director_id = d.id 
       LEFT JOIN usuarios u ON p.creado_por = u.id 
       WHERE p.estado = 'pendiente'
       ORDER BY p.created_at ASC`
    );
    return rows.map((row) => new Pelicula(row));
  }

  async actualizarEstado(id, estado, aprobadoPor) {
    await this.query(
      `UPDATE peliculas SET estado = ?, aprobado_por = ? WHERE id = ?`,
      [estado, aprobadoPor, id]
    );
    return this.buscarPorId(id);
  }

  async actualizar(id, { titulo, tituloNormalizado, descripcion, duracionMinutos, tipo, anio, categoriaId, directorId, imagenUrl }) {
    await this.query(
      `UPDATE peliculas 
       SET titulo = COALESCE(?, titulo),
           titulo_normalizado = COALESCE(?, titulo_normalizado),
           descripcion = COALESCE(?, descripcion),
           duracion_minutos = COALESCE(?, duracion_minutos),
           tipo = COALESCE(?, tipo),
           anio = COALESCE(?, anio),
           categoria_id = COALESCE(?, categoria_id),
           director_id = COALESCE(?, director_id),
           imagen_url = COALESCE(?, imagen_url)
       WHERE id = ?`,
      [
        titulo || null,
        tituloNormalizado || null,
        descripcion || null,
        duracionMinutos || null,
        tipo || null,
        anio || null,
        categoriaId || null,
        directorId || null,
        imagenUrl || null,
        id
      ]
    );
    return this.buscarPorId(id);
  }

  async eliminar(id) {
    const [result] = await this.query('DELETE FROM peliculas WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

export const peliculaModel = new PeliculaModel();
export default PeliculaModel;
