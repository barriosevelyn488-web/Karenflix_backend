import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UsuarioModel } from '../models/usuario.model.js';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

export const AuthService = {
  async registrar({ nombre, email, password }) {
    const normalizedEmail = email.trim().toLowerCase();
    if (await UsuarioModel.buscarPorEmail(normalizedEmail))
      throw new AppError('El correo ya está registrado.', 409, 'EMAIL_EXISTS');
    const passwordHash = await bcrypt.hash(password, 12);
    const id = await UsuarioModel.crear({
      nombre: nombre.trim(),
      email: normalizedEmail,
      password: passwordHash
    });
    const usuario = { id, nombre: nombre.trim(), email: normalizedEmail, rol: 'usuario' };
    return { token: this.crearToken(usuario), usuario };
  },
  async login({ email, password }) {
    const usuario = await UsuarioModel.buscarPorEmail(email.trim().toLowerCase());
    if (!usuario || !(await bcrypt.compare(password, usuario.password_hash)))
      throw new AppError('Credenciales inválidas.', 401, 'INVALID_CREDENTIALS');
    const dto = { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol };
    return { token: this.crearToken(dto), usuario: dto };
  },
  crearToken(usuario) {
    return jwt.sign({ sub: String(usuario.id), rol: usuario.rol }, env.jwt.secret, {
      expiresIn: env.jwt.expiresIn,
      issuer: 'karenflix-api',
      audience: 'karenflix-client'
    });
  }
};
