import { AppError } from '../utils/AppError.js';
import { env } from '../config/env.js';
export const notFound = (req, res, next) =>
  next(new AppError(`Ruta no encontrada: ${req.method} ${req.originalUrl}`, 404, 'NOT_FOUND'));
export const errorHandler = (error, req, res, _next) => {
  let status = error.statusCode || 500,
    code = error.code || 'INTERNAL_ERROR',
    message = error.message || 'Error interno del servidor';
  if (error.code === 'ER_DUP_ENTRY') {
    status = 409;
    code = 'DUPLICATE';
    message = 'El registro ya existe.';
  }
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    status = 400;
    code = 'INVALID_JSON';
    message = 'El cuerpo de la solicitud no contiene JSON válido.';
  }
  if (error.code === 'ER_NO_REFERENCED_ROW_2') {
    status = 400;
    code = 'INVALID_REFERENCE';
    message = 'La referencia indicada no existe.';
  }
  if (error.code === 'ER_ROW_IS_REFERENCED_2') {
    status = 409;
    code = 'RESOURCE_IN_USE';
    message = 'No se puede eliminar porque el registro está en uso.';
  }
  if (message === 'Origen no permitido por CORS.') {
    status = 403;
    code = 'CORS_ORIGIN_DENIED';
    message = 'Origen no permitido.';
  }
  if (status >= 500) {
    console.error({ requestId: req.id, method: req.method, path: req.path, error: error.message });
    message = 'Error interno del servidor';
  }
  res.status(status).json({
    status: status >= 500 ? 'error' : 'fail',
    error: {
      code,
      message,
      ...(env.nodeEnv !== 'production' && status >= 500 ? { detail: error.message } : {}),
      requestId: req.id
    }
  });
};
