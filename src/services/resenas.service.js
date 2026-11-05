import fs from 'node:fs/promises';
import path from 'node:path';
import { BaseService } from './base.service.js';
import { resenaModel as defaultResenaModel, ResenaModel } from '../models/resena.model.js';
import { peliculaModel as defaultPeliculaModel, PeliculaModel } from '../models/pelicula.model.js';

export class ResenasService extends BaseService {
  constructor(resenaModel = defaultResenaModel, peliculaModel = defaultPeliculaModel) {
    super();
    this.resenaModel = resenaModel;
    this.peliculaModel = peliculaModel;
  }

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

  async listarPorPelicula(peliculaId) {
    const resenas = await this.resenaModel.listarPorPelicula(peliculaId);
    return resenas.map((r) => r.toJSON());
  }

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

  /**
   * Genera un archivo CSV con todas las reseñas de una película y lo guarda en /exports.
   * Requisitos del examen:
   * - Nombre del usuario 
   * - Calificación asignada 1 a 5
   * - Comentario escrito
   * - Fecha de creación de la reseña
   * - Guardado en carpeta /exports del backend
   * - NO descargarse en el navegador
   */
  async exportarResenasCSV(peliculaId) {
    const pelicula = await this.peliculaModel.buscarPorId(peliculaId);
    if (!pelicula) {
      throw this.createError('Película no encontrada.', 404);
    }

    const resenas = await this.resenaModel.listarPorPelicula(peliculaId);

    const encabezados = ['Nombre del usuario', 'Calificacion (1 a 5)', 'Comentario', 'Fecha de creacion'];

    const filas = resenas.map((r) => {
      const nombreUsuario = `"${(r.usuario_nombre || 'Anónimo').replace(/"/g, '""')}"`;
      // Convertir a escala 1 a 5 en caso de estar almacenado en base a 10
      const calificacionOriginal = Number(r.calificacion) || 5;
      const calificacion1a5 = Math.min(
        5,
        Math.max(1, Math.round(calificacionOriginal > 5 ? calificacionOriginal / 2 : calificacionOriginal))
      );
      const comentario = `"${(r.comentario || '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`;
      const fecha = r.created_at
        ? new Date(r.created_at).toISOString().replace('T', ' ').substring(0, 19)
        : new Date().toISOString().replace('T', ' ').substring(0, 19);

      return [nombreUsuario, calificacion1a5, comentario, `"${fecha}"`].join(',');
    });

    const contenidoCSV = [encabezados.join(','), ...filas].join('\n');

    const nombreArchivo = `resenas_pelicula_${peliculaId}.csv`;
    const rutaDirectorio = path.resolve(process.cwd(), 'exports');
    await fs.mkdir(rutaDirectorio, { recursive: true });
    const rutaArchivo = path.join(rutaDirectorio, nombreArchivo);

    await fs.writeFile(rutaArchivo, contenidoCSV, 'utf-8');

    return {
      archivo: nombreArchivo,
      ruta: `exports/${nombreArchivo}`,
      total_resenas: resenas.length,
      pelicula: pelicula.titulo || `ID ${peliculaId}`
    };
  }
}

export const resenasService = new ResenasService();
export const ResenaService = resenasService;
export default ResenasService;
