import mysql from 'mysql2/promise';
import { env } from '../config/env.js';

const pool = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.name
});

export const ReaccionModel = {
  async registrarReaccion({ usuarioId, resenaId, tipo }) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      await connection.query(
        `INSERT INTO reacciones (usuario_id, resena_id, tipo) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE tipo = ?`,
        [usuarioId, resenaId, tipo, tipo]
      );

      const [conteo] = await connection.query(
        `SELECT 
           SUM(CASE WHEN tipo = 'like' THEN 1 ELSE 0 END) as likes,
           SUM(CASE WHEN tipo = 'dislike' THEN 1 ELSE 0 END) as dislikes
         FROM reacciones WHERE resena_id = ?`,
        [resenaId]
      );

      const likes = conteo[0].likes || 0;
      const dislikes = conteo[0].dislikes || 0;

      await connection.query(
        `UPDATE resenas SET likes = ?, dislikes = ? WHERE id = ?`,
        [likes, dislikes, resenaId]
      );

      await connection.commit();
      connection.release();
      return { likes, dislikes };
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  }
};
