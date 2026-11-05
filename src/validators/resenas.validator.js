import { body, param } from 'express-validator';

export const validarResena = [
  body('calificacion').isInt({ min: 1, max: 10 }).withMessage('La calificación debe ser entre 1 y 10')
];

export const validarCrearResena = [
  param('id').isInt({ min: 1 }).toInt(),
  body('titulo').optional().trim().isLength({ min: 2, max: 150 }),
  body('comentario').optional().trim().isLength({ min: 2, max: 5000 }),
  body('calificacion').isInt({ min: 1, max: 10 }).toInt()
];

export const validarActualizarResena = [
  param('id').isInt({ min: 1 }).toInt(),
  body('titulo').optional().trim().isLength({ min: 2, max: 150 }),
  body('comentario').optional().trim().isLength({ min: 2, max: 5000 }),
  body('calificacion').isInt({ min: 1, max: 10 }).toInt()
];

export const validarReaccion = [
  body('tipo').isIn(['like', 'dislike']).withMessage('El tipo de reacción debe ser like o dislike')
];

export const validarIdResena = [param('id').isInt({ min: 1 }).toInt()];
