import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { env } from './env.js';
import { UsuarioModel } from '../models/usuario.model.js';

const fromCookieOrHeader = (req) => {
  const bearer = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  if (bearer) return bearer;
  const prefix = `${env.jwt.cookieName}=`;
  const item = req.headers.cookie
    ?.split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));
  return item ? decodeURIComponent(item.slice(prefix.length)) : null;
};
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: fromCookieOrHeader,
      secretOrKey: env.jwt.secret,
      issuer: 'karenflix-api',
      audience: 'karenflix-client'
    },
    async (payload, done) => {
      try {
        const usuario = await UsuarioModel.buscarPorId(payload.sub);
        return done(null, usuario || false);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
export default passport;
