import { BaseService } from './base.service.js';
import { peliculaModel as defaultPeliculaModel, PeliculaModel } from '../models/pelicula.model.js';
import { normalizarTexto } from '../utils/normalizar.js';

export class PeliculasService extends BaseService {
  constructor(peliculaModel = defaultPeliculaModel) {
    super();
    this.peliculaModel = peliculaModel;
  }

  async proponer({
    titulo,
    descripcion,
    duracion_minutos,
    tipo,
    anio,
    categoria_id,
    director_nombre,
    imagen_url,
    creadoPor,
    estado = 'pendiente'
  }) {
    const tituloNormalizado = normalizarTexto(titulo);

    const existente = await this.peliculaModel.buscarPorTituloNormalizado(tituloNormalizado);
    if (existente) {
      throw this.createError('Ya existe una película o serie con ese título.', 409);
    }

    const directorId = await this.peliculaModel.obtenerOCrearDirector(director_nombre);

    const peliculaId = await this.peliculaModel.crear({
      titulo,
      tituloNormalizado,
      descripcion,
      duracionMinutos: duracion_minutos || null,
      tipo,
      anio,
      categoriaId: categoria_id,
      directorId,
      imagenUrl: imagen_url || null,
      creadoPor,
      estado
    });

    const creada = await this.peliculaModel.buscarPorId(peliculaId);
    return creada ? creada.toJSON() : { id: peliculaId, titulo, estado };
  }

  async listarAprobadas(filtros = {}) {
    const peliculas = await this.peliculaModel.listarAprobadas(filtros);
    return peliculas.map((p) => p.toJSON());
  }

  async buscarPorId(id) {
    const pelicula = await this.peliculaModel.buscarPorId(id);
    if (!pelicula) {
      throw this.createError('Película no encontrada.', 404);
    }
    return pelicula.toJSON();
  }

  async listarPendientes() {
    const pendientes = await this.peliculaModel.listarPendientes();
    return pendientes.map((p) => p.toJSON());
  }

  async cambiarEstado(id, estado, aprobadoPor) {
    const pelicula = await this.peliculaModel.buscarPorId(id);
    if (!pelicula) {
      throw this.createError('Película no encontrada.', 404);
    }

    const estadosValidos = ['pendiente', 'aprobada', 'rechazada'];
    if (!estadosValidos.includes(estado)) {
      throw this.createError(`Estado inválido. Debe ser uno de: ${estadosValidos.join(', ')}`, 400);
    }

    const actualizada = await this.peliculaModel.actualizarEstado(id, estado, aprobadoPor);
    return actualizada ? actualizada.toJSON() : { id, estado };
  }

  async actualizar(id, data) {
    await this.buscarPorId(id);

    let directorId = undefined;
    if (data.director_nombre !== undefined) {
      directorId = await this.peliculaModel.obtenerOCrearDirector(data.director_nombre);
    }

    const tituloNormalizado = data.titulo ? normalizarTexto(data.titulo) : undefined;

    const actualizada = await this.peliculaModel.actualizar(id, {
      titulo: data.titulo,
      tituloNormalizado,
      descripcion: data.descripcion,
      duracionMinutos: data.duracion_minutos,
      tipo: data.tipo,
      anio: data.anio,
      categoriaId: data.categoria_id,
      directorId,
      imagenUrl: data.imagen_url
    });

    return actualizada.toJSON();
  }

  async eliminar(id) {
    await this.buscarPorId(id);
    return await this.peliculaModel.eliminar(id);
  }
}

export const peliculasService = new PeliculasService();
export const PeliculaService = peliculasService;
export default PeliculasService;
