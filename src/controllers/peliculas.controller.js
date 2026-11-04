import { BaseController } from './base.controller.js';
import { peliculasService as defaultPeliculasService, PeliculasService } from '../services/peliculas.service.js';

/**
 * Controlador de Películas y Series orientado a objetos
 */
export class PeliculasController extends BaseController {
  constructor(peliculasService = defaultPeliculasService) {
    super();
    this.peliculasService = peliculasService;
  }

  listarPeliculas = async (req, res, next) => {
    try {
      const { categoria, orden, busqueda, page, limit } = req.query;
      const peliculas = await this.peliculasService.listarAprobadas({
        categoria,
        orden,
        busqueda,
        page,
        limit
      });
      return this.sendSuccess(res, peliculas);
    } catch (error) {
      this.handleError(next, error);
    }
  };

  obtenerPelicula = async (req, res, next) => {
    try {
      const pelicula = await this.peliculasService.buscarPorId(req.params.id);
      return this.sendSuccess(res, pelicula);
    } catch (error) {
      this.handleError(next, error);
    }
  };

  proponerPelicula = async (req, res, next) => {
    try {
      const data = {
        ...req.body,
        creadoPor: req.user ? req.user.id : null
      };
      const pelicula = await this.peliculasService.proponer(data);
      return this.sendCreated(res, pelicula);
    } catch (error) {
      this.handleError(next, error);
    }
  };

  listarPendientes = async (req, res, next) => {
    try {
      const pendientes = await this.peliculasService.listarPendientes();
      return this.sendSuccess(res, pendientes);
    } catch (error) {
      this.handleError(next, error);
    }
  };

  cambiarEstadoPelicula = async (req, res, next) => {
    try {
      const { estado } = req.body;
      const adminId = req.user ? req.user.id : null;
      await this.peliculasService.cambiarEstado(req.params.id, estado, adminId);
      return this.sendSuccess(res, null, 200, `Película ${estado} exitosamente.`);
    } catch (error) {
      this.handleError(next, error);
    }
  };

  actualizarPelicula = async (req, res, next) => {
    try {
      const actualizada = await this.peliculasService.actualizar(req.params.id, req.body);
      return this.sendSuccess(res, actualizada);
    } catch (error) {
      this.handleError(next, error);
    }
  };

  eliminarPelicula = async (req, res, next) => {
    try {
      await this.peliculasService.eliminar(req.params.id);
      return this.sendSuccess(res, null, 200, 'Película eliminada');
    } catch (error) {
      this.handleError(next, error);
    }
  };
}

export const peliculasController = new PeliculasController();
export const listarPeliculas = peliculasController.listarPeliculas;
export const obtenerPelicula = peliculasController.obtenerPelicula;
export const proponerPelicula = peliculasController.proponerPelicula;
export const listarPendientes = peliculasController.listarPendientes;
export const cambiarEstadoPelicula = peliculasController.cambiarEstadoPelicula;
export const actualizarPelicula = peliculasController.actualizarPelicula;
export const eliminarPelicula = peliculasController.eliminarPelicula;
export default PeliculasController;
