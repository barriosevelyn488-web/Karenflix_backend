import { AuthService } from '../services/auth.service.js';
import { env } from '../config/env.js';
import { createDto, createInputDto } from '../factories/dto.factory.js';
const expiresMs = () => {
  const m = String(env.jwt.expiresIn).match(/^(\d+)(s|m|h|d)$/);
  if (!m) return 7200000;
  return Number(m[1]) * { s: 1000, m: 60000, h: 3600000, d: 86400000 }[m[2]];
};
const cookieOptions = () => ({
  httpOnly: true,
  secure: env.nodeEnv === 'production',
  sameSite: env.nodeEnv === 'production' ? 'none' : 'lax',
  path: '/',
  maxAge: expiresMs()
});
export const registrar = async (req, res, next) => {
  try {
    const result = await AuthService.registrar(createInputDto('usuario', req.body));
    res
      .cookie(env.jwt.cookieName, result.token, cookieOptions())
      .status(201)
      .json({
        status: 'success',
        data: { usuario: createDto('usuario', result.usuario), token: result.token }
      });
  } catch (e) {
    next(e);
  }
};
export const login = async (req, res, next) => {
  try {
    const result = await AuthService.login(createInputDto('usuario', req.body));
    res.cookie(env.jwt.cookieName, result.token, cookieOptions()).json({
      status: 'success',
      data: { usuario: createDto('usuario', result.usuario), token: result.token }
    });
  } catch (e) {
    next(e);
  }
};
export const logout = (_req, res) =>
  res
    .clearCookie(env.jwt.cookieName, {
      httpOnly: true,
      secure: env.nodeEnv === 'production',
      sameSite: env.nodeEnv === 'production' ? 'none' : 'lax',
      path: '/'
    })
    .status(204)
    .end();
export const me = (req, res) =>
  res.json({ status: 'success', data: createDto('usuario', req.user) });
