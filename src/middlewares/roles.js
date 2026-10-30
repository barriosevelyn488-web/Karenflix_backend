import { AppError } from '../utils/AppError.js';

// Revisa el rol que requireAuth previamente adjuntó a req.user.
export const requireAdmin = (req, _res, next) =>
  req.user?.rol === 'admin'
    ? next()
    : next(new AppError('Se requieren permisos de administrador.', 403, 'FORBIDDEN'));
