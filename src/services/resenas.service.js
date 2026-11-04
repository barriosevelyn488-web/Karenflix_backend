import { BaseService } from './base.service.js';
import { resenaModel as defaultResenaModel, ResenaModel } from '../models/resena.model.js';
import { peliculaModel as defaultPeliculaModel, PeliculaModel } from '../models/pelicula.model.js';

/**
 * Servicio de Reseñas orientado a objetos con control transaccional
 */
export class ResenasService extends BaseService {
  constructor(resenaModel = defaultResenaModel, peliculaModel = defaultPeliculaModel) {
    super();
    this.resenaModel = resenaModel;
    this.peliculaModel = peliculaModel;
  }

  /**
   * Crea una reseña validando que la película esté aprobada y que el usuario no tenga reseña previa.
   */
  async crear({ pelicula_id, usuario_id, titulo, comentario, calificacion }) {
    const pelicula = await this.peliculaModel.buscarPorId(pelicula_id);
    if (!pelicula || pelicula.estado !== 'aprobada') {
      throw this.createError('Película no encontrada o no aprobada.', 404);
    }

    try {
      const resenaId = await this.resenaModel.crearConTransaccion({
        peliculaId: pelicula_id,
        usuarioId: usuario_id,
        titulo,
        comentario,
        calificacion
      });
      return { id: resenaId, pelicula_id, usuario_id, titulo, calificacion };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw this.createError('Ya has publicado una reseña para esta película.', 409);
      }
      throw error;
    }
  }

  /**
   * Lista todas las reseñas de una película dada.
   */
  async listarPorPelicula(peliculaId) {
    const resenas = await this.resenaModel.listarPorPelicula(peliculaId);
    return resenas.map((r) => r.toJSON());
  }

  /**
   * Actualiza el contenido o calificación de una reseña verificando autoría.
   */
  async actualizar(resenaId, usuarioId, { titulo, comentario, calificacion }) {
    const resena = await this.resenaModel.buscarPorId(resenaId);
    if (!resena) {
      throw this.createError('Reseña no encontrada.', 404);
    }

    if (resena.usuario_id !== usuarioId) {
      throw this.createError('No tienes permisos para editar esta reseña.', 403);
    }

    await this.resenaModel.actualizarConTransaccion(resenaId, {
      titulo,
      comentario,
      calificacion,
      peliculaId: resena.pelicula_id
    });

    const actualizada = await this.resenaModel.buscarPorId(resenaId);
    return actualizada.toJSON();
  }

  /**
   * Elimina una reseña verificando autoría o rol de administrador.
   */
  async eliminar(resenaId, usuarioId, userRol = 'usuario') {
    const resena = await this.resenaModel.buscarPorId(resenaId);
    if (!resena) {
      throw this.createError('Reseña no encontrada.', 404);
    }

    if (resena.usuario_id !== usuarioId && userRol !== 'admin') {
      throw this.createError('No tienes permisos para eliminar esta reseña.', 403);
    }

    await this.resenaModel.eliminarConTransaccion(resenaId, resena.pelicula_id);
    return true;
  }
}

export const resenasService = new ResenasService();
export const ResenaService = resenasService;
export default ResenasService;
