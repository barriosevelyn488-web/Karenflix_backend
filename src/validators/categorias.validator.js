import { body } from 'express-validator';

// Reglas de entrada para crear o editar categorías.
export const validarCategoria = [
  body('nombre').trim().isLength({ min: 2, max: 100 }),
  body('descripcion').optional({ nullable: true }).isString().isLength({ max: 2000 })
];
