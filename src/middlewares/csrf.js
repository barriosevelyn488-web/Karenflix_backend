import { env } from '../config/env.js';

const unsafe = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

// Rechaza escrituras con cookie si el origen no está permitido; Bearer no usa cookie.
export const csrfGuard = (req, res, next) => {
  const hasCookie = Boolean(req.headers.cookie?.includes(`${env.jwt.cookieName}=`));
  const hasBearer = Boolean(req.headers.authorization?.startsWith('Bearer '));
  if (
    hasCookie &&
    !hasBearer &&
    req.path !== '/auth/logout' &&
    unsafe.has(req.method) &&
    (!req.headers.origin || !env.corsOrigins.includes(req.headers.origin))
  )
    return res
      .status(403)
      .json({
        status: 'fail',
        error: {
          code: 'CSRF_ORIGIN_DENIED',
          message: 'Origen no permitido para esta operación.'
        }
      });
  next();
};
