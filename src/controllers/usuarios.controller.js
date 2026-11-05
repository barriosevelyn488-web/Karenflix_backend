import { BaseController } from './base.controller.js';
import { usuariosService as defaultUsuariosService, UsuariosService } from '../services/usuarios.service.js';

export class UsuariosController extends BaseController {
  constructor(usuariosService = defaultUsuariosService) {
    super();
    this.usuariosService = usuariosService;
  }

  listarUsuarios = async (req, res, next) => {
    try {
      const usuarios = await this.usuariosService.listar();
      return this.sendSuccess(res, usuarios);
    } catch (error) {
      this.handleError(next, error);
    }
  };

  obtenerUsuario = async (req, res, next) => {
    try {
      const usuario = await this.usuariosService.buscarPorId(req.params.id);
      return this.sendSuccess(res, usuario);
    } catch (error) {
      this.handleError(next, error);
    }
  };

  actualizarUsuario = async (req, res, next) => {
    try {
      const { id } = req.params;
      const actualizado = await this.usuariosService.actualizar(id, req.body, req.user.id);
      return this.sendSuccess(res, actualizado, 200, 'Usuario actualizado exitosamente');
    } catch (error) {
      this.handleError(next, error);
    }
  };

  eliminarUsuario = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.usuariosService.eliminar(id, req.user.id);
      return this.sendSuccess(res, null, 200, 'Usuario eliminado exitosamente');
    } catch (error) {
      this.handleError(next, error);
    }
  };
}

export const usuariosController = new UsuariosController();
export const listarUsuarios = usuariosController.listarUsuarios;
export const obtenerUsuario = usuariosController.obtenerUsuario;
export const actualizarUsuario = usuariosController.actualizarUsuario;
export const eliminarUsuario = usuariosController.eliminarUsuario;
export default UsuariosController;
