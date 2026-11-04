import { BaseModel } from './base.model.js';
import { Categoria } from '../entities/Categoria.js';

/**
 * Modelo de Categorías orientado a objetos
 */
export class CategoriaModel extends BaseModel {
  /**
   * Crea una nueva categoría.
   * @param {object} param0
   * @returns {Promise<number>}
   */
  async crear({ nombre, descripcion }) {
    const [result] = await this.query(
      'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)',
      [nombre, descripcion || null]
    );
    return result.insertId;
  }

  /**
   * Lista todas las categorías en orden alfabético.
   * @returns {Promise<Categoria[]>}
   */
  async listar() {
    const [rows] = await this.query('SELECT * FROM categorias ORDER BY nombre ASC');
    return rows.map((row) => new Categoria(row));
  }

  /**
   * Busca una categoría por su ID.
   * @param {number} id
   * @returns {Promise<Categoria|null>}
   */
  async buscarPorId(id) {
    const [rows] = await this.query('SELECT * FROM categorias WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return new Categoria(rows[0]);
  }

  /**
   * Actualiza el nombre y descripción de una categoría.
   * @param {number} id
   * @param {object} param1
   */
  async actualizar(id, { nombre, descripcion }) {
    await this.query(
      'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?',
      [nombre, descripcion || null, id]
    );
    return this.buscarPorId(id);
  }

  /**
   * Elimina una categoría por su ID.
   * @param {number} id
   */
  async eliminar(id) {
    const [result] = await this.query('DELETE FROM categorias WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

export const categoriaModel = new CategoriaModel();
export default CategoriaModel;

