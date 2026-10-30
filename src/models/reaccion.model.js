import pool from '../config/db.js';

// Persiste reacciones y sincroniza los contadores almacenados en cada reseña.
export const ReaccionModel = {
  async registrarReaccion({ usuarioId, resenaId, tipo }) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      await connection.query('SELECT id FROM resenas WHERE id=? FOR UPDATE', [resenaId]);
      await connection.query(
        'INSERT INTO reacciones(usuario_id,resena_id,tipo) VALUES(?,?,?) ON DUPLICATE KEY UPDATE tipo=VALUES(tipo)',
        [usuarioId, resenaId, tipo]
      );
      const [[reactionTotals]] = await connection.query(
        "SELECT SUM(tipo='like') likes,SUM(tipo='dislike') dislikes FROM reacciones WHERE resena_id=?",
        [resenaId]
      );
      const counts = {
        likes: Number(reactionTotals.likes || 0),
        dislikes: Number(reactionTotals.dislikes || 0)
      };
      await connection.query('UPDATE resenas SET likes=?,dislikes=? WHERE id=?', [
        counts.likes,
        counts.dislikes,
        resenaId
      ]);
      await connection.commit();
      return counts;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
  async quitar({ usuarioId, resenaId }) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      await connection.query('SELECT id FROM resenas WHERE id=? FOR UPDATE', [resenaId]);
      await connection.query('DELETE FROM reacciones WHERE usuario_id=? AND resena_id=?', [
        usuarioId,
        resenaId
      ]);
      const [[reactionTotals]] = await connection.query(
        "SELECT SUM(tipo='like') likes,SUM(tipo='dislike') dislikes FROM reacciones WHERE resena_id=?",
        [resenaId]
      );
      const counts = {
        likes: Number(reactionTotals.likes || 0),
        dislikes: Number(reactionTotals.dislikes || 0)
      };
      await connection.query('UPDATE resenas SET likes=?,dislikes=? WHERE id=?', [
        counts.likes,
        counts.dislikes,
        resenaId
      ]);
      await connection.commit();
      return counts;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
};
