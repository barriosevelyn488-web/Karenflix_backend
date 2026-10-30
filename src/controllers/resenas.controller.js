import { ResenaService } from '../services/resenas.service.js';
import { ReaccionService } from '../services/reacciones.service.js';
import { createDto, createInputDto } from '../factories/dto.factory.js';

// Coordina las rutas HTTP de reseñas con sus servicios y transforma las respuestas.
export const listarResenasPelicula = async (req, res, next) => {
  try {
    res.json({
      status: 'success',
      data: (await ResenaService.listarPorPelicula(Number(req.params.id))).map((resena) =>
        createDto('resena', resena)
      )
    });
  } catch (error) {
    next(error);
  }
};

export const crearResena = async (req, res, next) => {
  try {
    const datos = createInputDto('resena', req.body);
    const id = await ResenaService.crear({
      pelicula_id: Number(req.params.id),
      usuario_id: req.user.id,
      ...datos
    });
    res.status(201).json({ status: 'success', data: { id, ...datos, usuario_id: req.user.id } });
  } catch (error) {
    next(error);
  }
};

export const actualizarResena = async (req, res, next) => {
  try {
    const datos = createInputDto('resena', req.body);
    await ResenaService.actualizar(Number(req.params.id), req.user.id, datos);
    res.json({
      status: 'success',
      data: { id: Number(req.params.id), ...datos, usuario_id: req.user.id }
    });
  } catch (error) {
    next(error);
  }
};

export const eliminarResena = async (req, res, next) => {
  try {
    await ResenaService.eliminar(Number(req.params.id), req.user.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const reaccionarResena = async (req, res, next) => {
  try {
    res.json({
      status: 'success',
      data: await ReaccionService.reaccionar({
        usuarioId: req.user.id,
        resenaId: Number(req.params.id),
        tipo: req.body.tipo
      })
    });
  } catch (error) {
    next(error);
  }
};

export const quitarReaccion = async (req, res, next) => {
  try {
    res.json({
      status: 'success',
      data: await ReaccionService.quitar({
        usuarioId: req.user.id,
        resenaId: Number(req.params.id)
      })
    });
  } catch (error) {
    next(error);
  }
};
