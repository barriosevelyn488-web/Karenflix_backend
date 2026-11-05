export class BaseController {
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

  sendCreated(res, data = null, message = undefined) {
    return this.sendSuccess(res, data, 201, message);
  }

  sendNoContent(res) {
    return res.status(204).send();
  }

  handleError(next, error) {
    next(error);
  }
}
