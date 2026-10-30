import { PeliculaService } from '../services/peliculas.service.js';
import { createDto, createInputDto } from '../factories/dto.factory.js';

// Recibe las rutas de películas, delega el trabajo al servicio y adapta DTO de salida.
export const listarPeliculas = async (req, res, next) => {
  try {
    const result = await PeliculaService.listar({
      page: Number(req.query.page || 1),
      limit: Number(req.query.limit || 20),
      categoria_id: req.query.categoria_id ? Number(req.query.categoria_id) : undefined,
      q: req.query.q,
      orden: req.query.orden
    });
    res.json({
      status: 'success',
      data: {
        ...result,
        items: result.items.map((pelicula) => createDto('pelicula', pelicula))
      }
    });
  } catch (error) {
    next(error);
  }
};

export const obtenerPelicula = async (req, res, next) => {
  try {
    res.json({
      status: 'success',
      data: createDto('pelicula', await PeliculaService.obtener(Number(req.params.id)))
    });
  } catch (error) {
    next(error);
  }
};

export const proponerPelicula = async (req, res, next) => {
  try {
    const datos = createInputDto('pelicula', req.body);
    const id = await PeliculaService.crear(datos, req.user.id);
    res.status(201).json({ status: 'success', data: { id, estado: 'pendiente' } });
  } catch (error) {
    next(error);
  }
};

export const listarPendientes = async (_req, res, next) => {
  try {
    res.json({ status: 'success', data: await PeliculaService.pendientes() });
  } catch (error) {
    next(error);
  }
};

export const cambiarEstadoPelicula = async (req, res, next) => {
  try {
    await PeliculaService.estado(Number(req.params.id), req.body.estado, req.user.id);
    res.json({ status: 'success', data: { id: Number(req.params.id), estado: req.body.estado } });
  } catch (error) {
    next(error);
  }
};

export const actualizarPelicula = async (req, res, next) => {
  try {
    const datos = createInputDto('pelicula', req.body);
    await PeliculaService.actualizar(Number(req.params.id), datos);
    res.json({ status: 'success', data: { id: Number(req.params.id), ...datos } });
  } catch (error) {
    next(error);
  }
};

export const eliminarPelicula = async (req, res, next) => {
  try {
    await PeliculaService.eliminar(Number(req.params.id));
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
