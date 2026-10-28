import mysql from 'mysql2/promise';
import { env } from '../config/env.js';

const pool = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.name
});

export const UsuarioModel = {
  async buscarPorEmail(email) {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
  },
  
  async crear({ nombre, email, password, rol }) {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (?, ?, ?, ?)',
      [nombre, email, password, rol || 'usuario']
    );
    return result.insertId;
  }
};
