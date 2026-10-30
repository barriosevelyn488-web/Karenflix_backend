import pool from '../config/db.js';

// Persistencia de categorías; este modelo es usado por CategoriaService.
export const CategoriaModel = {
  async listar() {
    const [rows] = await pool.query(
      `SELECT c.id,c.nombre,c.descripcion,c.created_at,COUNT(p.id) AS total_peliculas
       FROM categorias c
       LEFT JOIN peliculas p ON p.categoria_id=c.id
       GROUP BY c.id
       ORDER BY c.nombre`
    );
    return rows;
  },

  async crear({ nombre, descripcion }) {
    const [result] = await pool.query('INSERT INTO categorias(nombre,descripcion) VALUES(?,?)', [
      nombre,
      descripcion || null
    ]);
    return result.insertId;
  },

  async actualizar(id, { nombre, descripcion }) {
    const [existing] = await pool.query('SELECT id FROM categorias WHERE id=?', [id]);
    if (!existing.length) return false;
    await pool.query('UPDATE categorias SET nombre=?,descripcion=? WHERE id=?', [
      nombre,
      descripcion || null,
      id
    ]);
    return true;
  },

  async eliminar(id) {
    const [result] = await pool.query('DELETE FROM categorias WHERE id=?', [id]);
    return result.affectedRows > 0;
  }
};
