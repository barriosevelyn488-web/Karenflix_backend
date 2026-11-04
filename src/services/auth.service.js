import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BaseService } from './base.service.js';
import { usuarioModel as defaultUsuarioModel, UsuarioModel } from '../models/usuario.model.js';
import { config } from '../config/config.js';

export class AuthService extends BaseService {
  constructor(usuarioModel = defaultUsuarioModel) {
    super();
    this.usuarioModel = usuarioModel;
  }

  generarToken(usuario) {
    const payload = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    };
    return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
  }

  async registrar({ nombre, email, password, rol = 'usuario' }) {
    const existe = await this.usuarioModel.buscarPorEmail(email);
    if (existe) {
      throw this.createError('El correo electrónico ya está registrado', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = await this.usuarioModel.crear({
      nombre,
      email,
      password: hashedPassword,
      rol
    });

    const usuario = { id, nombre, email, rol };
    const token = this.generarToken(usuario);

    return { token, usuario };
  }

  async login({ email, password }) {
    const usuario = await this.usuarioModel.buscarPorEmail(email);
    if (!usuario) {
      throw this.createError('Credenciales inválidas', 401);
    }

    const valido = await bcrypt.compare(password, usuario.password_hash);
    if (!valido) {
      throw this.createError('Credenciales inválidas', 401);
    }

    const usuarioData = usuario.toJSON();
    const token = this.generarToken(usuarioData);

    return { token, usuario: usuarioData };
  }

  async obtenerPerfil(id) {
    const usuario = await this.usuarioModel.buscarPorId(id);
    if (!usuario) {
      throw this.createError('Usuario no encontrado', 404);
    }
    return usuario.toJSON();
  }

  async actualizarPerfil(id, { nombre, password }) {
    let hashedPassword = null;
    if (password && password.trim()) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    const actualizado = await this.usuarioModel.actualizarPerfil(id, {
      nombre,
      password: hashedPassword
    });
    return actualizado.toJSON();
  }
}

export const authService = new AuthService();
export default AuthService;
