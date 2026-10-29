import pool from '../config/db.js';

export const RankingModel = {
  async listarPorScore(limit) {
    const [rows] = await pool.query(
      `SELECT p.id,p.titulo,p.tipo,p.anio,p.imagen_url,p.trailer_url,
        p.rating_promedio,p.total_resenas,c.nombre AS categoria_nombre,
        ROUND(
          CASE
            WHEN COUNT(r.id)=0 THEN 0
            ELSE
              0.8*((COUNT(r.id)/(COUNT(r.id)+3))*AVG(r.calificacion)+(3/(COUNT(r.id)+3))*5)
              +0.1*(10*(SUM(r.likes)+1)/(SUM(r.likes)+SUM(r.dislikes)+2))
              +0.1*(5+5*AVG(EXP(-GREATEST(TIMESTAMPDIFF(DAY,r.created_at,UTC_TIMESTAMP()),0)/180)))
          END,2
        ) AS score_ponderado
       FROM peliculas p
       JOIN categorias c ON c.id=p.categoria_id
       LEFT JOIN resenas r ON r.pelicula_id=p.id
       WHERE p.estado='aprobada'
       GROUP BY p.id,c.nombre
       ORDER BY score_ponderado DESC,p.total_resenas DESC,p.titulo ASC
       LIMIT ?`,
      [limit]
    );
    return rows;
  }
};
