import { body } from 'express-validator';

export const validarResena = [
  body('titulo').notEmpty().withMessage('El título de la reseña es obligatorio'),
  body('comentario').notEmpty().withMessage('El comentario es obligatorio'),
  body('calificacion').isInt({ min: 1, max: 10 }).withMessage('La calificación debe ser un número entero entre 1 y 10')
];

export const validarReaccion = [
  body('tipo').isIn(['like', 'dislike']).withMessage('El tipo de reacción debe ser "like" o "dislike"')
];
