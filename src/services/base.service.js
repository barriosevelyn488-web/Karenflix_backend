/**
 * Clase base para la capa de servicios (Lógica de Negocio - POO)
 */
export class BaseService {
  /**
   * Crea un error de aplicación con código HTTP personalizado.
   * @param {string} message
   * @param {number} statusCode
   */
  createError(message, statusCode = 400) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  }
}

