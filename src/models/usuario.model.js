import { BaseModel } from './base.model.js';
import { Usuario } from '../entities/Usuario.js';

export class UsuarioModel extends BaseModel {
  async listar() {
    const [rows] = await this.query('SELECT * FROM usuarios ORDER BY id ASC');
    return rows.map((row) => new Usuario(row));
  }

  async buscarPorEmail(email) {
    const [rows] = await this.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (rows.length === 0) return null;
    return new Usuario(rows[0]);
  }

  async buscarPorId(id) {
    const [rows] = await this.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return new Usuario(rows[0]);
  }

  async crear({ nombre, email, password, rol = 'usuario' }) {
    const [result] = await this.query(
      'INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (?, ?, ?, ?)',
      [nombre, email, password, rol]
    );
    return result.insertId;
  }

  async actualizarPerfil(id, { nombre, password }) {
    if (password) {
      await this.query(
        'UPDATE usuarios SET nombre = ?, password_hash = ? WHERE id = ?',
        [nombre, password, id]
      );
    } else {
      await this.query(
        'UPDATE usuarios SET nombre = ? WHERE id = ?',
        [nombre, id]
      );
    }
    return this.buscarPorId(id);
  }

  async actualizarPorAdmin(id, { nombre, email, rol, password }) {
    await this.query(
      `UPDATE usuarios 
       SET nombre = COALESCE(?, nombre),
           email = COALESCE(?, email),
           rol = COALESCE(?, rol),
           password_hash = COALESCE(?, password_hash)
       WHERE id = ?`,
      [nombre || null, email || null, rol || null, password || null, id]
    );
    return this.buscarPorId(id);
  }

  async eliminar(id) {
    const [result] = await this.query('DELETE FROM usuarios WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

export const usuarioModel = new UsuarioModel();
export default UsuarioModel;
