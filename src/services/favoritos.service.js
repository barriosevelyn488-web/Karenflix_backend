import { BaseService } from './base.service.js';
import { favoritoModel as defaultFavoritoModel, FavoritoModel } from '../models/favorito.model.js';
import { peliculaModel as defaultPeliculaModel, PeliculaModel } from '../models/pelicula.model.js';

export class FavoritosService extends BaseService {
  constructor(favoritoModel = defaultFavoritoModel, peliculaModel = defaultPeliculaModel) {
    super();
    this.favoritoModel = favoritoModel;
    this.peliculaModel = peliculaModel;
  }

  async agregar(usuarioId, peliculaId) {
    const pelicula = await this.peliculaModel.buscarPorId(peliculaId);
    if (!pelicula) {
      throw this.createError('Película no encontrada.', 404);
    }
    await this.favoritoModel.agregar({ usuarioId, peliculaId });
    return true;
  }

  async listar(usuarioId) {
    const favoritos = await this.favoritoModel.listarPorUsuario(usuarioId);
    return favoritos.map((f) => f.toJSON());
  }

  async eliminar(usuarioId, peliculaId) {
    return await this.favoritoModel.eliminar({ usuarioId, peliculaId });
  }
}

export const favoritosService = new FavoritosService();
export default FavoritosService;
