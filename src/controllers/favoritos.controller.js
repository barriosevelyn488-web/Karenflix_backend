import { BaseController } from './base.controller.js';
import { favoritosService as defaultFavoritosService, FavoritosService } from '../services/favoritos.service.js';

/**
 * Controlador de Favoritos / Watchlist orientado a objetos
 */
export class FavoritosController extends BaseController {
  constructor(favoritosService = defaultFavoritosService) {
    super();
    this.favoritosService = favoritosService;
  }

  listarFavoritos = async (req, res, next) => {
    try {
      const favoritos = await this.favoritosService.listar(req.user.id);
      return this.sendSuccess(res, favoritos);
    } catch (error) {
      this.handleError(next, error);
    }
  };

  agregarFavorito = async (req, res, next) => {
    try {
      const { pelicula_id } = req.body;
      await this.favoritosService.agregar(req.user.id, pelicula_id);
      return this.sendCreated(res, null, 'Película agregada a favoritos');
    } catch (error) {
      this.handleError(next, error);
    }
  };

  eliminarFavorito = async (req, res, next) => {
    try {
      const peliculaId = req.params.id;
      await this.favoritosService.eliminar(req.user.id, peliculaId);
      return this.sendSuccess(res, null, 200, 'Película eliminada de favoritos');
    } catch (error) {
      this.handleError(next, error);
    }
  };
}

export const favoritosController = new FavoritosController();
export const listarFavoritos = favoritosController.listarFavoritos;
export const agregarFavorito = favoritosController.agregarFavorito;
export const eliminarFavorito = favoritosController.eliminarFavorito;
export default FavoritosController;

