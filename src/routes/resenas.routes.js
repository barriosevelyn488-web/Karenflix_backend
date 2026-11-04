import { Router } from 'express';
import { resenasController } from '../controllers/resenas.controller.js';
import { validarResena, validarReaccion } from '../validators/resenas.validator.js';
import { validate } from '../middlewares/validate.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

router.get('/pelicula/:id', resenasController.listarResenasPelicula);
router.post('/pelicula/:id', requireAuth, validarResena, validate, resenasController.crearResena);
router.put('/:id', requireAuth, validarResena, validate, resenasController.actualizarResena);
router.delete('/:id', requireAuth, resenasController.eliminarResena);
router.post('/:id/reaccion', requireAuth, validarReaccion, validate, resenasController.reaccionarResena);

export default router;
