import { CategoriaService } from '../services/categorias.service.js';
import { createInputDto } from '../factories/dto.factory.js';
export const listarCategorias = async (_req, res, next) => {
  try {
    res.json({ status: 'success', data: await CategoriaService.listar() });
  } catch (e) {
    next(e);
  }
};
export const crearCategoria = async (req, res, next) => {
  try {
    const datos = createInputDto('categoria', req.body);
    const id = await CategoriaService.crear(datos);
    res.status(201).json({ status: 'success', data: { id, ...datos } });
  } catch (e) {
    next(e);
  }
};
export const actualizarCategoria = async (req, res, next) => {
  try {
    const datos = createInputDto('categoria', req.body);
    await CategoriaService.actualizar(req.params.id, datos);
    res.json({ status: 'success', data: { id: Number(req.params.id), ...datos } });
  } catch (e) {
    next(e);
  }
};
export const eliminarCategoria = async (req, res, next) => {
  try {
    await CategoriaService.eliminar(req.params.id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};
