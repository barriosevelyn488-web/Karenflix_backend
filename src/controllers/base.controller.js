/**
 * Controlador Base (POO)
 * Proporciona métodos estándar para respuestas HTTP y manejo uniforme de errores.
 */
export class BaseController {
  /**
   * Envía una respuesta exitosa estandarizada.
   * @param {import('express').Response} res
   * @param {any} data
   * @param {number} statusCode
   * @param {string|undefined} message
   */
  sendSuccess(res, data = null, statusCode = 200, message = undefined) {
    const payload = { status: 'success' };
    if (message !== undefined) {
      payload.message = message;
    }
    if (data !== null && data !== undefined) {
      payload.data = data;
    }
    return res.status(statusCode).json(payload);
  }

  /**
   * Envía una respuesta HTTP 201 Created.
   */
  sendCreated(res, data = null, message = undefined) {
    return this.sendSuccess(res, data, 201, message);
  }

  /**
   * Envía una respuesta HTTP 204 No Content.
   */
  sendNoContent(res) {
    return res.status(204).send();
  }

  /**
   * Pasa el error al middleware de error centralizado de Express.
   * @param {Function} next
   * @param {Error} error
   */
  handleError(next, error) {
    next(error);
  }
}

