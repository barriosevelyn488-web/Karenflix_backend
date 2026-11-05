import { BaseModel } from './base.model.js';
import { Categoria } from '../entities/Categoria.js';

export class CategoriaModel extends BaseModel {
  async crear({ nombre, descripcion }) {
    const [result] = await this.query(
      'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)',
      [nombre, descripcion || null]
    );
    return result.insertId;
  }

  async listar() {
    const [rows] = await this.query('SELECT * FROM categorias ORDER BY nombre ASC');
    return rows.map((row) => new Categoria(row));
  }

  async buscarPorId(id) {
    const [rows] = await this.query('SELECT * FROM categorias WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return new Categoria(rows[0]);
  }

  async actualizar(id, { nombre, descripcion }) {
    await this.query(
      'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?',
      [nombre, descripcion || null, id]
    );
    return this.buscarPorId(id);
  }

  async eliminar(id) {
    const [result] = await this.query('DELETE FROM categorias WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

export const categoriaModel = new CategoriaModel();
export default CategoriaModel;
