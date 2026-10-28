import mysql from 'mysql2/promise';
import { env } from '../config/env.js';

const pool = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.name
});

export const ResenaModel = {
  async crearConTransaccion({ peliculaId, usuarioId, titulo, comentario, calificacion }) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [resResult] = await connection.query(
        `INSERT INTO resenas (pelicula_id, usuario_id, titulo, comentario, calificacion) VALUES (?, ?, ?, ?, ?)`,
        [peliculaId, usuarioId, titulo, comentario, calificacion]
      );
      const resenaId = resResult.insertId;

      const [stats] = await connection.query(
        `SELECT AVG(calificacion) as promedio, COUNT(*) as total FROM resenas WHERE pelicula_id = ?`,
        [peliculaId]
      );
      const nuevoPromedio = stats[0].promedio || 0;
      const nuevoTotal = stats[0].total || 0;

      await connection.query(
        `UPDATE peliculas SET rating_promedio = ?, total_resenas = ? WHERE id = ?`,
        [nuevoPromedio, nuevoTotal, peliculaId]
      );

      await connection.commit();
      connection.release();
      return resenaId;
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  },

  async listarPorPelicula(peliculaId) {
    const [rows] = await pool.query(
      `SELECT r.*, u.nombre as usuario_nombre 
       FROM resenas r 
       JOIN usuarios u ON r.usuario_id = u.id 
       WHERE r.pelicula_id = ? 
       ORDER BY r.created_at DESC`,
      [peliculaId]
    );
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await pool.query('SELECT * FROM resenas WHERE id = ?', [id]);
    return rows[0];
  },

  async eliminarConTransaccion(resenaId, peliculaId) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      await connection.query('DELETE FROM resenas WHERE id = ?', [resenaId]);

      const [stats] = await connection.query(
        `SELECT AVG(calificacion) as promedio, COUNT(*) as total FROM resenas WHERE pelicula_id = ?`,
        [peliculaId]
      );
      const nuevoPromedio = stats[0].promedio || 0;
      const nuevoTotal = stats[0].total || 0;

      await connection.query(
        `UPDATE peliculas SET rating_promedio = ?, total_resenas = ? WHERE id = ?`,
        [nuevoPromedio, nuevoTotal, peliculaId]
      );

      await connection.commit();
      connection.release();
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  }
};
