import { CategoriaModel } from '../models/categoria.model.js';
import { AppError } from '../utils/AppError.js';
export const CategoriaService = {
  listar: () => CategoriaModel.listar(),
  async crear(data) {
    try {
      return await CategoriaModel.crear(data);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY')
        throw new AppError('Ya existe una categoría con ese nombre.', 409, 'CATEGORY_EXISTS');
      throw e;
    }
  },
  async actualizar(id, data) {
    try {
      if (!(await CategoriaModel.actualizar(id, data)))
        throw new AppError('Categoría no encontrada.', 404, 'NOT_FOUND');
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY')
        throw new AppError('Ya existe una categoría con ese nombre.', 409, 'CATEGORY_EXISTS');
      throw e;
    }
  },
  async eliminar(id) {
    try {
      if (!(await CategoriaModel.eliminar(id)))
        throw new AppError('Categoría no encontrada.', 404, 'NOT_FOUND');
    } catch (e) {
      if (e.code === 'ER_ROW_IS_REFERENCED_2')
        throw new AppError('La categoría tiene títulos asociados.', 409, 'CATEGORY_IN_USE');
      throw e;
    }
  }
};
