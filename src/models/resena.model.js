import { BaseModel } from './base.model.js';
import { Resena } from '../entities/Resena.js';

export class ResenaModel extends BaseModel {
  async crearConTransaccion({ peliculaId, usuarioId, titulo, comentario, calificacion }) {
    return this.transaction(async (conn) => {
      const [resResult] = await conn.query(
        `INSERT INTO resenas (pelicula_id, usuario_id, titulo, comentario, calificacion) VALUES (?, ?, ?, ?, ?)`,
        [peliculaId, usuarioId, titulo || 'Reseña', comentario, calificacion]
      );
      const resenaId = resResult.insertId;

      const [stats] = await conn.query(
        `SELECT AVG(calificacion) as promedio, COUNT(*) as total FROM resenas WHERE pelicula_id = ?`,
        [peliculaId]
      );
      const nuevoPromedio = stats[0].promedio || 0;
      const nuevoTotal = stats[0].total || 0;

      await conn.query(
        `UPDATE peliculas SET rating_promedio = ?, total_resenas = ? WHERE id = ?`,
        [nuevoPromedio, nuevoTotal, peliculaId]
      );

      return resenaId;
    });
  }

  async listarPorPelicula(peliculaId) {
    const [rows] = await this.query(
      `SELECT r.*, u.nombre as usuario_nombre 
       FROM resenas r 
       JOIN usuarios u ON r.usuario_id = u.id 
       WHERE r.pelicula_id = ? 
       ORDER BY r.created_at DESC`,
      [peliculaId]
    );
    return rows.map((row) => new Resena(row));
  }

  async buscarPorId(id) {
    const [rows] = await this.query(
      `SELECT r.*, u.nombre as usuario_nombre 
       FROM resenas r 
       JOIN usuarios u ON r.usuario_id = u.id 
       WHERE r.id = ?`,
      [id]
    );
    if (rows.length === 0) return null;
    return new Resena(rows[0]);
  }

  async actualizarConTransaccion(id, { titulo, comentario, calificacion, peliculaId }) {
    return this.transaction(async (conn) => {
      await conn.query(
        `UPDATE resenas 
         SET titulo = COALESCE(?, titulo),
             comentario = COALESCE(?, comentario),
             calificacion = COALESCE(?, calificacion)
         WHERE id = ?`,
        [titulo || null, comentario || null, calificacion || null, id]
      );

      if (calificacion !== undefined && peliculaId) {
        const [stats] = await conn.query(
          `SELECT AVG(calificacion) as promedio, COUNT(*) as total FROM resenas WHERE pelicula_id = ?`,
          [peliculaId]
        );
        await conn.query(
          `UPDATE peliculas SET rating_promedio = ?, total_resenas = ? WHERE id = ?`,
          [stats[0].promedio || 0, stats[0].total || 0, peliculaId]
        );
      }

      return true;
    });
  }

  async eliminarConTransaccion(resenaId, peliculaId) {
    return this.transaction(async (conn) => {
      await conn.query('DELETE FROM resenas WHERE id = ?', [resenaId]);

      const [stats] = await conn.query(
        `SELECT AVG(calificacion) as promedio, COUNT(*) as total FROM resenas WHERE pelicula_id = ?`,
        [peliculaId]
      );
      const nuevoPromedio = stats[0].promedio || 0;
      const nuevoTotal = stats[0].total || 0;

      await conn.query(
        `UPDATE peliculas SET rating_promedio = ?, total_resenas = ? WHERE id = ?`,
        [nuevoPromedio, nuevoTotal, peliculaId]
      );

      return true;
    });
  }
}

export const resenaModel = new ResenaModel();
export default ResenaModel;
