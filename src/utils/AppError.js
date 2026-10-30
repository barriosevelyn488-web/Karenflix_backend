// Error de dominio con estado y código que interpreta middlewares/errorHandler.js.
export class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);

    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
  }
}
