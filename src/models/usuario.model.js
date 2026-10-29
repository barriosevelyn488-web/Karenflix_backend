import pool from '../config/db.js';
export const UsuarioModel = {
  async buscarPorEmail(email) {
    const [rows] = await pool.query(
      'SELECT id, nombre, email, password_hash, rol, created_at FROM usuarios WHERE email = ?',
      [email]
    );
    return rows[0];
  },
  async buscarPorId(id) {
    const [rows] = await pool.query(
      'SELECT id, nombre, email, rol, created_at FROM usuarios WHERE id = ?',
      [id]
    );
    return rows[0];
  },
  async crear({ nombre, email, password }) {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (?, ?, ?, ?)',
      [nombre, email.toLowerCase(), password, 'usuario']
    );
    return result.insertId;
  }
};
