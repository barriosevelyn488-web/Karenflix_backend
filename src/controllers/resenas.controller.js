import { ResenaService } from '../services/resenas.service.js';
import { ReaccionService } from '../services/reacciones.service.js';

export const crearResena = async (req, res, next) => {
  try {
    const data = {
      pelicula_id: req.params.id,
      usuario_id: req.user.id,
      ...req.body
    };
    const resultado = await ResenaService.crear(data);
    res.status(201).json({ status: 'success', data: resultado });
  } catch (error) {
    next(error);
  }
};

export const listarResenasPelicula = async (req, res, next) => {
  try {
    const resenas = await ResenaService.listarPorPelicula(req.params.id);
    res.status(200).json({ status: 'success', data: resenas });
  } catch (error) {
    next(error);
  }
};

export const eliminarResena = async (req, res, next) => {
  try {
    await ResenaService.eliminar(req.params.id, req.user.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const reaccionarResena = async (req, res, next) => {
  try {
    const { tipo } = req.body;
    const resultado = await ReaccionService.reaccionar({
      usuarioId: req.user.id,
      resenaId: req.params.id,
      tipo
    });
    res.status(200).json({ status: 'success', data: resultado });
  } catch (error) {
    next(error);
  }
};
