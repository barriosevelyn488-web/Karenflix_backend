import pool from '../config/db.js';

// Recalcula el resumen agregado de una película tras modificar sus reseñas.
async function recalcularRating(connection, peliculaId) {
  await connection.query('SELECT id FROM peliculas WHERE id=? FOR UPDATE', [peliculaId]);
  const [[stats]] = await connection.query(
    'SELECT COALESCE(AVG(calificacion),0) AS promedio, COUNT(*) AS total FROM resenas WHERE pelicula_id=?',
    [peliculaId]
  );
  await connection.query('UPDATE peliculas SET rating_promedio=?,total_resenas=? WHERE id=?', [
    Number(stats.promedio),
    stats.total,
    peliculaId
  ]);
}

// Persistencia de reseñas; ResenaService valida permisos y existencia del recurso.
export const ResenaModel = {
  async listarPorPelicula(peliculaId) {
    const [rows] = await pool.query(
      `SELECT r.id,r.pelicula_id,r.usuario_id,r.titulo,r.comentario,r.calificacion,
        r.likes,r.dislikes,r.created_at,r.updated_at,u.nombre AS usuario_nombre
       FROM resenas r
       JOIN usuarios u ON u.id=r.usuario_id
       WHERE r.pelicula_id=?
       ORDER BY r.created_at DESC`,
      [peliculaId]
    );
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await pool.query('SELECT * FROM resenas WHERE id=?', [id]);
    return rows[0];
  },

  async crearConTransaccion(datos) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      await connection.query('SELECT id FROM peliculas WHERE id=? FOR UPDATE', [datos.peliculaId]);
      const [result] = await connection.query(
        'INSERT INTO resenas(pelicula_id,usuario_id,titulo,comentario,calificacion) VALUES(?,?,?,?,?)',
        [datos.peliculaId, datos.usuarioId, datos.titulo, datos.comentario, datos.calificacion]
      );
      await recalcularRating(connection, datos.peliculaId);
      await connection.commit();
      return result.insertId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async actualizarConTransaccion(datos) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      await connection.query('SELECT id FROM peliculas WHERE id=? FOR UPDATE', [datos.peliculaId]);
      const [existing] = await connection.query(
        'SELECT id FROM resenas WHERE id=? AND usuario_id=? FOR UPDATE',
        [datos.id, datos.usuarioId]
      );
      if (!existing.length) {
        await connection.rollback();
        return false;
      }

      await connection.query(
        'UPDATE resenas SET titulo=?,comentario=?,calificacion=? WHERE id=? AND usuario_id=?',
        [datos.titulo, datos.comentario, datos.calificacion, datos.id, datos.usuarioId]
      );
      await recalcularRating(connection, datos.peliculaId);
      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async eliminarConTransaccion(id, peliculaId, usuarioId) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      await connection.query('SELECT id FROM peliculas WHERE id=? FOR UPDATE', [peliculaId]);
      const [result] = await connection.query('DELETE FROM resenas WHERE id=? AND usuario_id=?', [
        id,
        usuarioId
      ]);
      if (!result.affectedRows) {
        await connection.rollback();
        return false;
      }

      await recalcularRating(connection, peliculaId);
      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
};
