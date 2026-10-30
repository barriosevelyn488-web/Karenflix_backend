import { param } from 'express-validator';

// Valida el identificador de ruta antes de que llegue a los controladores.
export const validarId = [param('id').isInt({ min: 1 }).toInt()];
