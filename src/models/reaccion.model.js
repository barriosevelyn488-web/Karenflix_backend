import pool from '../config/db.js';
export const ReaccionModel = {
  async registrarReaccion({ usuarioId, resenaId, tipo }) {
    const c = await pool.getConnection();
    try {
      await c.beginTransaction();
      await c.query('SELECT id FROM resenas WHERE id=? FOR UPDATE', [resenaId]);
      await c.query(
        'INSERT INTO reacciones(usuario_id,resena_id,tipo) VALUES(?,?,?) ON DUPLICATE KEY UPDATE tipo=VALUES(tipo)',
        [usuarioId, resenaId, tipo]
      );
      const [[n]] = await c.query(
        "SELECT SUM(tipo='like') likes,SUM(tipo='dislike') dislikes FROM reacciones WHERE resena_id=?",
        [resenaId]
      );
      const counts = { likes: Number(n.likes || 0), dislikes: Number(n.dislikes || 0) };
      await c.query('UPDATE resenas SET likes=?,dislikes=? WHERE id=?', [
        counts.likes,
        counts.dislikes,
        resenaId
      ]);
      await c.commit();
      return counts;
    } catch (e) {
      await c.rollback();
      throw e;
    } finally {
      c.release();
    }
  },
  async quitar({ usuarioId, resenaId }) {
    const c = await pool.getConnection();
    try {
      await c.beginTransaction();
      await c.query('SELECT id FROM resenas WHERE id=? FOR UPDATE', [resenaId]);
      await c.query('DELETE FROM reacciones WHERE usuario_id=? AND resena_id=?', [
        usuarioId,
        resenaId
      ]);
      const [[n]] = await c.query(
        "SELECT SUM(tipo='like') likes,SUM(tipo='dislike') dislikes FROM reacciones WHERE resena_id=?",
        [resenaId]
      );
      const counts = { likes: Number(n.likes || 0), dislikes: Number(n.dislikes || 0) };
      await c.query('UPDATE resenas SET likes=?,dislikes=? WHERE id=?', [
        counts.likes,
        counts.dislikes,
        resenaId
      ]);
      await c.commit();
      return counts;
    } catch (e) {
      await c.rollback();
      throw e;
    } finally {
      c.release();
    }
  }
};
