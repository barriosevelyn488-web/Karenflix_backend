import pool from '../config/db.js';

// Consultas de usuarios consumidas por autenticación y por la estrategia JWT.
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
  },
  async actualizar(id, { nombre, email, passwordHash }) {
    if (passwordHash) {
      await pool.query(
        'UPDATE usuarios SET nombre = ?, email = ?, password_hash = ? WHERE id = ?',
        [nombre, email.toLowerCase(), passwordHash, id]
      );
    } else {
      await pool.query('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?', [
        nombre,
        email.toLowerCase(),
        id
      ]);
    }
    return this.buscarPorId(id);
  }
};
