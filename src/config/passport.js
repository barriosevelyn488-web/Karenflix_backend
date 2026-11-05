import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { config } from './config.js';
import { usuarioModel } from '../models/usuario.model.js';

const extractToken = (req) => {
  const bearer = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  if (bearer) return bearer;
  const cookieHeader = req?.headers?.cookie;
  if (!cookieHeader) return null;
  const match = cookieHeader.split(';').map(c => c.trim()).find(c => c.startsWith('karenflix_token='));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: extractToken,
      secretOrKey: config.jwt.secret
    },
    async (jwtPayload, done) => {
      try {
        const email = jwtPayload.email;
        if (!email) return done(null, false);
        const usuario = await usuarioModel.buscarPorEmail(email);
        if (usuario) {
          return done(null, {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
          });
        }
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default passport;
