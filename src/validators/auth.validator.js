import { body } from 'express-validator';

// Validaciones asociadas a los endpoints de registro e inicio de sesión.
export const validarRegistro = [
  body('nombre').trim().isLength({ min: 2, max: 100 }),
  body('email').trim().isEmail().normalizeEmail().isLength({ max: 150 }),
  body('password')
    .isString()
    .isLength({ min: 10 })
    .custom((value) => Buffer.byteLength(value, 'utf8') <= 72)
];

export const validarLogin = [
  body('email').trim().isEmail().normalizeEmail(),
  body('password')
    .isString()
    .notEmpty()
    .custom((value) => Buffer.byteLength(value, 'utf8') <= 72)
];
