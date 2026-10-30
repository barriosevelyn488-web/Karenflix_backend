import passport from 'passport';

// Usa la estrategia JWT registrada en config/passport.js para poblar req.user.
export const requireAuth = (req, res, next) =>
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error) return next(error);
    if (!user)
      return res.status(401).json({
        status: 'fail',
        error: { code: 'UNAUTHENTICATED', message: 'Inicia sesión para continuar.' }
      });
    req.user = user;
    next();
  })(req, res, next);
