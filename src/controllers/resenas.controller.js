import { BaseController } from './base.controller.js';
import { resenasService as defaultResenasService, ResenasService } from '../services/resenas.service.js';
import { reaccionesService as defaultReaccionesService, ReaccionesService } from '../services/reacciones.service.js';

export class ResenasController extends BaseController {
  constructor(
    resenasService = defaultResenasService,
    reaccionesService = defaultReaccionesService
  ) {
    super();
    this.resenasService = resenasService;
    this.reaccionesService = reaccionesService;
  }

  listarResenasPelicula = async (req, res, next) => {
    try {
      const peliculaId = req.params.id || req.params.peliculaId;
      const resenas = await this.resenasService.listarPorPelicula(peliculaId);
      return this.sendSuccess(res, resenas);
    } catch (error) {
      this.handleError(next, error);
    }
  };

  crearResena = async (req, res, next) => {
    try {
      const peliculaId = req.params.id || req.params.peliculaId;
      const data = {
        pelicula_id: peliculaId,
        usuario_id: req.user.id,
        titulo: req.body.titulo,
        comentario: req.body.comentario,
        calificacion: req.body.calificacion
      };
      const resultado = await this.resenasService.crear(data);
      return this.sendCreated(res, resultado, 'Reseña creada y promedio actualizado');
    } catch (error) {
      this.handleError(next, error);
    }
  };

  actualizarResena = async (req, res, next) => {
    try {
      const { id } = req.params;
      const actualizada = await this.resenasService.actualizar(id, req.user.id, req.body);
      return this.sendSuccess(res, actualizada, 200, 'Reseña actualizada exitosamente');
    } catch (error) {
      this.handleError(next, error);
    }
  };

  eliminarResena = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.resenasService.eliminar(id, req.user.id, req.user.rol);
      return this.sendSuccess(res, null, 200, 'Reseña eliminada');
    } catch (error) {
      this.handleError(next, error);
    }
  };

  reaccionarResena = async (req, res, next) => {
    try {
      const { id: resenaId } = req.params;
      const { tipo } = req.body;
      const resultado = await this.reaccionesService.reaccionar({
        usuarioId: req.user.id,
        resenaId,
        tipo
      });
      return this.sendSuccess(res, resultado, 200, 'Reacción registrada correctamente');
    } catch (error) {
      this.handleError(next, error);
    }
  };


  //requisito de examen 
  exportarResenasCSV = async (req, res, next) => {
    try {
      const peliculaId = req.params.id || req.params.peliculaId;
      const resultado = await this.resenasService.exportarResenasCSV(peliculaId);
      return this.sendSuccess(res, resultado, 200, 'Archivo CSV generado exitosamente en el servidor');
    } catch (error) {
      this.handleError(next, error);
    }
  };
}

export const resenasController = new ResenasController();
export const listarResenasPelicula = resenasController.listarResenasPelicula;
export const crearResena = resenasController.crearResena;
export const actualizarResena = resenasController.actualizarResena;
export const eliminarResena = resenasController.eliminarResena;
export const reaccionarResena = resenasController.reaccionarResena;
export const exportarResenasCSV = resenasController.exportarResenasCSV;
export default ResenasController;
