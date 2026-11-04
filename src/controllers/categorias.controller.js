import { BaseController } from './base.controller.js';
import { categoriasService as defaultCategoriasService, CategoriasService } from '../services/categorias.service.js';

export class CategoriasController extends BaseController {
  constructor(categoriasService = defaultCategoriasService) {
    super();
    this.categoriasService = categoriasService;
  }

  listarCategorias = async (req, res, next) => {
    try {
      const categorias = await this.categoriasService.listar();
      return this.sendSuccess(res, categorias);
    } catch (error) {
      this.handleError(next, error);
    }
  };

  crearCategoria = async (req, res, next) => {
    try {
      const categoria = await this.categoriasService.crear(req.body);
      return this.sendCreated(res, categoria);
    } catch (error) {
      this.handleError(next, error);
    }
  };

  actualizarCategoria = async (req, res, next) => {
    try {
      const categoria = await this.categoriasService.actualizar(req.params.id, req.body);
      return this.sendSuccess(res, categoria);
    } catch (error) {
      this.handleError(next, error);
    }
  };

  eliminarCategoria = async (req, res, next) => {
    try {
      await this.categoriasService.eliminar(req.params.id);
      return this.sendSuccess(res, null, 200, 'Categoría eliminada');
    } catch (error) {
      this.handleError(next, error);
    }
  };
}

export const categoriasController = new CategoriasController();
export const listarCategorias = categoriasController.listarCategorias;
export const crearCategoria = categoriasController.crearCategoria;
export const actualizarCategoria = categoriasController.actualizarCategoria;
export const eliminarCategoria = categoriasController.eliminarCategoria;
export default CategoriasController;
