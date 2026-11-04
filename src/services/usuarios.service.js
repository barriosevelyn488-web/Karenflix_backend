import bcrypt from 'bcrypt';
import { BaseService } from './base.service.js';
import { usuarioModel as defaultUsuarioModel, UsuarioModel } from '../models/usuario.model.js';

export class UsuariosService extends BaseService {
  constructor(usuarioModel = defaultUsuarioModel) {
    super();
    this.usuarioModel = usuarioModel;
  }

  async listar() {
    const usuarios = await this.usuarioModel.listar();
    return usuarios.map((u) => u.toJSON());
  }

  async buscarPorId(id) {
    const usuario = await this.usuarioModel.buscarPorId(id);
    if (!usuario) {
      throw this.createError('Usuario no encontrado', 404);
    }
    return usuario.toJSON();
  }

  async actualizar(id, { nombre, email, rol, password }, adminId) {
    const usuario = await this.usuarioModel.buscarPorId(id);
    if (!usuario) {
      throw this.createError('Usuario no encontrado', 404);
    }

    if (email && email !== usuario.email) {
      const existeEmail = await this.usuarioModel.buscarPorEmail(email);
      if (existeEmail) {
        throw this.createError('El correo electrónico ya está en uso', 409);
      }
    }

    if (rol && !['usuario', 'admin'].includes(rol)) {
      throw this.createError('El rol debe ser usuario o admin', 400);
    }

    let hashedPassword = undefined;
    if (password && password.trim()) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const actualizado = await this.usuarioModel.actualizarPorAdmin(id, {
      nombre,
      email,
      rol,
      password: hashedPassword
    });

    return actualizado.toJSON();
  }

  async eliminar(id, adminId) {
    if (Number(id) === Number(adminId)) {
      throw this.createError('No puedes eliminar tu propia cuenta de administrador', 400);
    }

    const usuario = await this.usuarioModel.buscarPorId(id);
    if (!usuario) {
      throw this.createError('Usuario no encontrado', 404);
    }

    await this.usuarioModel.eliminar(id);
    return true;
  }
}

export const usuariosService = new UsuariosService();
export default UsuariosService;
