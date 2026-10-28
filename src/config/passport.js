import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { env } from './env.js';
import { UsuarioModel } from '../models/usuario.model.js';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwtSecret || 'karenflix_2026'
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const usuario = await UsuarioModel.buscarPorEmail(jwtPayload.email);
      if (usuario) {
        return done(null, { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol });
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
