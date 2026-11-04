import { BaseModel } from './base.model.js';

/**
 * Modelo de Reacciones a Reseñas (Like / Dislike) orientado a objetos
 */
export class ReaccionModel extends BaseModel {
  /**
   * Registra o actualiza la reacción de un usuario en una reseña de forma atómica.
   * @param {object} param0
   */
  async registrarReaccion({ usuarioId, resenaId, tipo }) {
    return this.transaction(async (conn) => {
      await conn.query(
        `INSERT INTO reacciones (usuario_id, resena_id, tipo) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE tipo = ?`,
        [usuarioId, resenaId, tipo, tipo]
      );

      const [conteo] = await conn.query(
        `SELECT 
           SUM(CASE WHEN tipo = 'like' THEN 1 ELSE 0 END) as likes,
           SUM(CASE WHEN tipo = 'dislike' THEN 1 ELSE 0 END) as dislikes
         FROM reacciones WHERE resena_id = ?`,
        [resenaId]
      );

      const likes = conteo[0].likes || 0;
      const dislikes = conteo[0].dislikes || 0;

      await conn.query(
        `UPDATE resenas SET likes = ?, dislikes = ? WHERE id = ?`,
        [likes, dislikes, resenaId]
      );

      return { likes, dislikes };
    });
  }
}

export const reaccionModel = new ReaccionModel();
export default ReaccionModel;
