import { body } from 'express-validator';
export const validarCategoria = [
  body('nombre').trim().isLength({ min: 2, max: 100 }),
  body('descripcion').optional({ nullable: true }).isString().isLength({ max: 2000 })
];
