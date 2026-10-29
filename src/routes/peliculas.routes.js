import { Router } from 'express';
import {
  listarPeliculas,
  obtenerPelicula,
  proponerPelicula,
  listarPendientes,
  cambiarEstadoPelicula,
  actualizarPelicula,
  eliminarPelicula
} from '../controllers/peliculas.controller.js';
import {
  validarPelicula,
  validarIdPelicula,
  validarListadoPeliculas,
  validarEstadoPelicula
} from '../validators/peliculas.validator.js';
import { validarCrearResena } from '../validators/resenas.validator.js';
import { listarResenasPelicula, crearResena } from '../controllers/resenas.controller.js';
import { validate } from '../middlewares/validate.js';
import { requireAuth } from '../middlewares/auth.js';
import { requireAdmin } from '../middlewares/roles.js';
const router = Router();
router.get('/', validarListadoPeliculas, validate, listarPeliculas);
router.get('/admin/pendientes', requireAuth, requireAdmin, listarPendientes);
router.post('/', requireAuth, validarPelicula, validate, proponerPelicula);
router.get('/:id/resenas', validarIdPelicula, validate, listarResenasPelicula);
router.post('/:id/resenas', requireAuth, validarCrearResena, validate, crearResena);
router.get('/:id', validarIdPelicula, validate, obtenerPelicula);
router.put(
  '/:id',
  requireAuth,
  requireAdmin,
  validarIdPelicula,
  validarPelicula,
  validate,
  actualizarPelicula
);
router.delete('/:id', requireAuth, requireAdmin, validarIdPelicula, validate, eliminarPelicula);
router.patch(
  '/admin/:id/estado',
  requireAuth,
  requireAdmin,
  validarEstadoPelicula,
  validate,
  cambiarEstadoPelicula
);
export default router;
