import rateLimit from 'express-rate-limit';

// Límites generales y específicos de autenticación aplicados por los routers.
export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'fail',
    error: { code: 'RATE_LIMITED', message: 'Demasiadas solicitudes. Intenta más tarde.' }
  }
});
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'fail',
    error: { code: 'AUTH_RATE_LIMITED', message: 'Demasiados intentos. Intenta más tarde.' }
  }
});
