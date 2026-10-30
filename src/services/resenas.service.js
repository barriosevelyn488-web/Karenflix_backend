import { PeliculaModel } from '../models/pelicula.model.js';
import { ResenaModel } from '../models/resena.model.js';
import { AppError } from '../utils/AppError.js';

// Coordina reglas de reseñas con las consultas de películas y ResenaModel.
export const ResenaService = {
  async crear({ pelicula_id, usuario_id, titulo, comentario, calificacion }) {
    if (!(await PeliculaModel.existeAprobada(pelicula_id))) {
      throw new AppError('Película no encontrada.', 404, 'NOT_FOUND');
    }
    try {
      return await ResenaModel.crearConTransaccion({
        peliculaId: pelicula_id,
        usuarioId: usuario_id,
        titulo,
        comentario,
        calificacion
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new AppError('Ya publicaste una reseña para esta película.', 409, 'REVIEW_EXISTS');
      }
      throw error;
    }
  },

  listarPorPelicula: (id) => ResenaModel.listarPorPelicula(id),

  async actualizar(id, userId, data) {
    const resena = await ResenaModel.buscarPorId(id);
    if (!resena) throw new AppError('Reseña no encontrada.', 404, 'NOT_FOUND');
    if (Number(resena.usuario_id) !== Number(userId)) {
      throw new AppError('Solo la autora puede modificar la reseña.', 403, 'FORBIDDEN');
    }
    const updated = await ResenaModel.actualizarConTransaccion({
      ...data,
      id,
      usuarioId: userId,
      peliculaId: resena.pelicula_id
    });
    if (!updated) throw new AppError('Reseña no encontrada.', 404, 'NOT_FOUND');
  },

  async eliminar(id, userId) {
    const resena = await ResenaModel.buscarPorId(id);
    if (!resena) throw new AppError('Reseña no encontrada.', 404, 'NOT_FOUND');
    if (Number(resena.usuario_id) !== Number(userId)) {
      throw new AppError('Solo la autora puede eliminar la reseña.', 403, 'FORBIDDEN');
    }
    await ResenaModel.eliminarConTransaccion(id, resena.pelicula_id, userId);
  }
};
