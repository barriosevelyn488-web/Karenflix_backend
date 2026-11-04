import { BaseController } from './base.controller.js';
import { authService as defaultAuthService, AuthService } from '../services/auth.service.js';

export class AuthController extends BaseController {
  constructor(authService = defaultAuthService) {
    super();
    this.authService = authService;
  }

  registrar = async (req, res, next) => {
    try {
      const resultado = await this.authService.registrar(req.body);
      return this.sendCreated(res, resultado);
    } catch (error) {
      this.handleError(next, error);
    }
  };

  login = async (req, res, next) => {
    try {
      const resultado = await this.authService.login(req.body);
      return this.sendSuccess(res, resultado);
    } catch (error) {
      this.handleError(next, error);
    }
  };

  me = async (req, res, next) => {
    try {
      return this.sendSuccess(res, req.user);
    } catch (error) {
      this.handleError(next, error);
    }
  };

  obtenerPerfil = async (req, res, next) => {
    try {
      const perfil = await this.authService.obtenerPerfil(req.user.id);
      return this.sendSuccess(res, perfil);
    } catch (error) {
      this.handleError(next, error);
    }
  };

  actualizarPerfil = async (req, res, next) => {
    try {
      const actualizado = await this.authService.actualizarPerfil(req.user.id, req.body);
      return this.sendSuccess(res, actualizado);
    } catch (error) {
      this.handleError(next, error);
    }
  };

  logout = async (req, res, next) => {
    try {
      return this.sendSuccess(res, null, 200, 'Sesión cerrada exitosamente');
    } catch (error) {
      this.handleError(next, error);
    }
  };
}

export const authController = new AuthController();
export const registrar = authController.registrar;
export const login = authController.login;
export const me = authController.me;
export const obtenerPerfil = authController.obtenerPerfil;
export const actualizarPerfil = authController.actualizarPerfil;
export const logout = authController.logout;
export default AuthController;
