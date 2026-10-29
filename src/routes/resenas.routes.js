import { Router } from 'express';
import {
  listarResenasPelicula,
  crearResena,
  actualizarResena,
  eliminarResena,
  reaccionarResena,
  quitarReaccion
} from '../controllers/resenas.controller.js';
import {
  validarCrearResena,
  validarActualizarResena,
  validarReaccion,
  validarIdResena
} from '../validators/resenas.validator.js';
import { param } from 'express-validator';
import { validate } from '../middlewares/validate.js';
import { requireAuth } from '../middlewares/auth.js';
const router = Router();
router.get(
  '/pelicula/:id',
  [param('id').isInt({ min: 1 }).toInt()],
  validate,
  listarResenasPelicula
);
router.post('/pelicula/:id', requireAuth, validarCrearResena, validate, crearResena);
router.put('/:id', requireAuth, validarActualizarResena, validate, actualizarResena);
router.delete('/:id', requireAuth, validarIdResena, validate, eliminarResena);
router.post('/:id/reaccion', requireAuth, validarReaccion, validate, reaccionarResena);
router.delete('/:id/reaccion', requireAuth, validarIdResena, validate, quitarReaccion);
export default router;
