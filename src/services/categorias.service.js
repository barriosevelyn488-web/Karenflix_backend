import { BaseService } from './base.service.js';
import { categoriaModel as defaultCategoriaModel, CategoriaModel } from '../models/categoria.model.js';

export class CategoriasService extends BaseService {
  constructor(categoriaModel = defaultCategoriaModel) {
    super();
    this.categoriaModel = categoriaModel;
  }

  async crear({ nombre, descripcion }) {
    try {
      const id = await this.categoriaModel.crear({ nombre: nombre.trim(), descripcion });
      return { id, nombre: nombre.trim(), descripcion };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw this.createError('Ya existe una categoría con ese nombre.', 409);
      }
      throw error;
    }
  }

  async listar() {
    const cats = await this.categoriaModel.listar();
    return cats.map((c) => c.toJSON());
  }

  async buscarPorId(id) {
    const cat = await this.categoriaModel.buscarPorId(id);
    if (!cat) {
      throw this.createError('Categoría no encontrada.', 404);
    }
    return cat.toJSON();
  }

  async actualizar(id, { nombre, descripcion }) {
    await this.buscarPorId(id);
    try {
      const cat = await this.categoriaModel.actualizar(id, { nombre: nombre.trim(), descripcion });
      return cat.toJSON();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw this.createError('Ya existe una categoría con ese nombre.', 409);
      }
      throw error;
    }
  }

  async eliminar(id) {
    await this.buscarPorId(id);
    try {
      await this.categoriaModel.eliminar(id);
      return true;
    } catch (error) {
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        throw this.createError('No se puede eliminar la categoría porque tiene películas asociadas.', 409);
      }
      throw error;
    }
  }
}

export const categoriasService = new CategoriasService();
export const CategoriaService = categoriasService;
export default CategoriasService;
