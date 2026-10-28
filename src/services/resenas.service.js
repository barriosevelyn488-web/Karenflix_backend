import { ResenaModel } from '../models/resena.model.js';
import mysql from 'mysql2/promise';
import { env } from '../config/env.js';

const pool = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.name
});

export const ResenaService = {
  async crear({ pelicula_id, usuario_id, titulo, comentario, calificacion }) {
    const [peli] = await pool.query('SELECT id FROM peliculas WHERE id = ? AND estado = ?', [pelicula_id, 'aprobada']);
    if (peli.length === 0) {
      const err = new Error('Película no encontrada o no aprobada.');
      err.statusCode = 404;
      throw err;
    }

    try {
      const resenaId = await ResenaModel.crearConTransaccion({
        peliculaId: pelicula_id,
        usuarioId: usuario_id,
        titulo,
        comentario,
        calificacion
      });
      return { id: resenaId, pelicula_id, usuario_id, titulo, calificacion };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        const err = new Error('Ya has publicado una reseña para esta película.');
        err.statusCode = 409;
        throw err;
      }
      throw error;
    }
  },

  async listarPorPelicula(peliculaId) {
    return await ResenaModel.listarPorPelicula(peliculaId);
  },

  async eliminar(resenaId, usuarioId) {
    const resena = await ResenaModel.buscarPorId(resenaId);
    if (!resena) {
      const err = new Error('Reseña no encontrada.');
      err.statusCode = 404;
      throw err;
    }
    if (resena.usuario_id !== usuarioId) {
      const err = new Error('No tienes permiso para eliminar esta reseña.');
      err.statusCode = 403;
      throw err;
    }

    await ResenaModel.eliminarConTransaccion(resenaId, resena.pelicula_id);
  }
};
