import { BaseModel } from './base.model.js';
import { Usuario } from '../entities/Usuario.js';

/**
 * Modelo de Usuario orientado a objetos
 */
export class UsuarioModel extends BaseModel {
  /**
   * Busca un usuario por su correo electrónico.
   * @param {string} email
   * @returns {Promise<Usuario|null>}
   */
  async buscarPorEmail(email) {
    const [rows] = await this.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (rows.length === 0) return null;
    return new Usuario(rows[0]);
  }

  /**
   * Busca un usuario por su ID.
   * @param {number} id
   * @returns {Promise<Usuario|null>}
   */
  async buscarPorId(id) {
    const [rows] = await this.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return new Usuario(rows[0]);
  }

  /**
   * Inserta un nuevo usuario en la base de datos.
   * @param {object} param0
   * @returns {Promise<number>} ID insertado
   */
  async crear({ nombre, email, password, rol = 'usuario' }) {
    const [result] = await this.query(
      'INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (?, ?, ?, ?)',
      [nombre, email, password, rol]
    );
    return result.insertId;
  }

  /**
   * Actualiza el perfil de un usuario.
   * @param {number} id
   * @param {object} param1
   */
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
}

// Instancia singleton para consumo directo
export const usuarioModel = new UsuarioModel();

// Compatibilidad estática con el código previo
export default UsuarioModel;
