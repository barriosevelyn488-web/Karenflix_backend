import mysql from 'mysql2/promise';
import { env } from '../config/env.js';

const pool = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.name
});

export const RankingService = {
  async obtenerRanking(limit = 10) {
    const [rows] = await pool.query(
      `SELECT p.*, c.nombre as categoria_nombre, d.nombre as director_nombre 
       FROM peliculas p 
       JOIN categorias c ON p.categoria_id = c.id 
       LEFT JOIN directores d ON p.director_id = d.id 
       WHERE p.estado = 'aprobada' 
       ORDER BY p.rating_promedio DESC, p.total_resenas DESC 
       LIMIT ?`,
      [Number(limit)]
    );
    return rows;
  }
};
