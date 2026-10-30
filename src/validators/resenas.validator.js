import { body, param } from 'express-validator';

// Reglas de entrada para las rutas de reseñas y sus reacciones.
export const validarCrearResena = [
  param('id').isInt({ min: 1 }).toInt(),
  body('titulo').trim().isLength({ min: 2, max: 150 }),
  body('comentario').trim().isLength({ min: 2, max: 5000 }),
  body('calificacion').isInt({ min: 1, max: 10 }).toInt()
];

export const validarActualizarResena = [
  param('id').isInt({ min: 1 }).toInt(),
  body('titulo').trim().isLength({ min: 2, max: 150 }),
  body('comentario').trim().isLength({ min: 2, max: 5000 }),
  body('calificacion').isInt({ min: 1, max: 10 }).toInt()
];

export const validarReaccion = [
  param('id').isInt({ min: 1 }).toInt(),
  body('tipo').isIn(['like', 'dislike'])
];

export const validarIdResena = [param('id').isInt({ min: 1 }).toInt()];
