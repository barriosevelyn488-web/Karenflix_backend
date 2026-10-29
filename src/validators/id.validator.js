import { param } from 'express-validator';

export const validarId = [param('id').isInt({ min: 1 }).toInt()];
