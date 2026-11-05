import { BaseModel } from './base.model.js';
import { Pelicula } from '../entities/Pelicula.js';

export class FavoritoModel extends BaseModel {
  async agregar({ usuarioId, peliculaId }) {
    await this.query(
      'INSERT IGNORE INTO favoritos (usuario_id, pelicula_id) VALUES (?, ?)',
      [usuarioId, peliculaId]
    );
    return true;
  }

  async listarPorUsuario(usuarioId) {
    const [rows] = await this.query(
      `SELECT p.*, c.nombre as categoria_nombre, d.nombre as director_nombre 
       FROM peliculas p 
       JOIN favoritos f ON p.id = f.pelicula_id 
       LEFT JOIN categorias c ON p.categoria_id = c.id 
       LEFT JOIN directores d ON p.director_id = d.id 
       WHERE f.usuario_id = ? 
       ORDER BY f.created_at DESC`,
      [usuarioId]
    );
    return rows.map((row) => new Pelicula(row));
  }

  async eliminar({ usuarioId, peliculaId }) {
    const [result] = await this.query(
      'DELETE FROM favoritos WHERE usuario_id = ? AND pelicula_id = ?',
      [usuarioId, peliculaId]
    );
    return result.affectedRows > 0;
  }
}

export const favoritoModel = new FavoritoModel();
export default FavoritoModel;
