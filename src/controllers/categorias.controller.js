import { CategoriaService } from '../services/categorias.service.js';
import { createInputDto } from '../factories/dto.factory.js';

// Adapta las solicitudes de categorías a las operaciones de CategoriaService.
export const listarCategorias = async (_req, res, next) => {
  try {
    res.json({ status: 'success', data: await CategoriaService.listar() });
  } catch (error) {
    next(error);
  }
};

export const crearCategoria = async (req, res, next) => {
  try {
    const datos = createInputDto('categoria', req.body);
    const id = await CategoriaService.crear(datos);
    res.status(201).json({ status: 'success', data: { id, ...datos } });
  } catch (error) {
    next(error);
  }
};

export const actualizarCategoria = async (req, res, next) => {
  try {
    const datos = createInputDto('categoria', req.body);
    await CategoriaService.actualizar(req.params.id, datos);
    res.json({ status: 'success', data: { id: Number(req.params.id), ...datos } });
  } catch (error) {
    next(error);
  }
};

export const eliminarCategoria = async (req, res, next) => {
  try {
    await CategoriaService.eliminar(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
