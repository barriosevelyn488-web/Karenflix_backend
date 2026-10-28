import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UsuarioModel } from '../models/usuario.model.js';
import { env } from '../config/env.js';

export const AuthService = {
  async registrar({ nombre, email, password, rol }) {
    const existe = await UsuarioModel.buscarPorEmail(email);
    if (existe) {
      const error = new Error('El correo electrónico ya está registrado');
      error.statusCode = 400;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = await UsuarioModel.crear({ nombre, email, password: hashedPassword, rol: rol || 'usuario' });
    const usuario = { id, nombre, email, rol: rol || 'usuario' };
    const token = jwt.sign(usuario, env.jwtSecret || 'karenflix_2026', { expiresIn: env.jwtExpiresIn || '2h' });
    return { token, usuario };
  },

  async login({ email, password }) {
    const usuario = await UsuarioModel.buscarPorEmail(email);
    if (!usuario) {
      const error = new Error('Credenciales inválidas');
      error.statusCode = 401;
      throw error;
    }
    // Comparamos el password ingresado con el password_hash de la BD
    const valido = await bcrypt.compare(password, usuario.password_hash);
    if (!valido) {
      const error = new Error('Credenciales inválidas');
      error.statusCode = 401;
      throw error;
    }
    const payload = { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol };
    const token = jwt.sign(payload, env.jwtSecret || 'karenflix_2026', { expiresIn: env.jwtExpiresIn || '2h' });
    return { token, usuario: payload };
  }
};
