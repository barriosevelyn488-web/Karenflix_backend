import { validationResult } from 'express-validator';

// Convierte errores de los validators en una respuesta uniforme antes del controlador.
export const validate = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const primerError = result.array()[0];
    let mensaje = 'Revisa los datos enviados.';
    if (primerError?.path === 'password') {
      mensaje = 'La contraseña debe tener al menos 8 caracteres.';
    } else if (primerError?.path === 'email') {
      mensaje = 'El correo electrónico no es válido.';
    } else if (primerError?.path === 'nombre') {
      mensaje = 'El nombre debe tener al menos 2 caracteres.';
    }
    return res.status(400).json({
      status: 'fail',
      error: {
        code: 'VALIDATION_ERROR',
        message: mensaje,
        details: result.array().map(({ path, msg }) => ({ field: path, message: msg }))
      }
    });
  }
  next();
};
