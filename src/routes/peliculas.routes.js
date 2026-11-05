import { Router } from 'express';
import { peliculasController } from '../controllers/peliculas.controller.js';
import { resenasController } from '../controllers/resenas.controller.js';
import { validarPelicula } from '../validators/peliculas.validator.js';
import { validarResena } from '../validators/resenas.validator.js';
import { validate } from '../middlewares/validate.js';
import { requireAuth } from '../middlewares/auth.js';
import { requireAdmin } from '../middlewares/roles.js';

const router = Router();

router.get('/', peliculasController.listarPeliculas);
router.get('/admin/pendientes', requireAuth, requireAdmin, peliculasController.listarPendientes);
router.patch('/admin/:id/estado', requireAuth, requireAdmin, peliculasController.cambiarEstadoPelicula);
router.post('/', requireAuth, validarPelicula, validate, peliculasController.proponerPelicula);
router.get('/:id', peliculasController.obtenerPelicula);
router.put('/:id', requireAuth, requireAdmin, peliculasController.actualizarPelicula);
router.delete('/:id', requireAuth, requireAdmin, peliculasController.eliminarPelicula);

// Reseñas de la película
router.get('/:id/resenas', resenasController.listarResenasPelicula);
router.post('/:id/resenas', requireAuth, validarResena, validate, resenasController.crearResena);

// Exportar reseñas en archivo CSV en el servidor backend (Requisito examen)
router.post('/:id/exportar-resenas', resenasController.exportarResenasCSV);
router.get('/:id/exportar-resenas', resenasController.exportarResenasCSV);
router.post('/:id/resenas/exportar', resenasController.exportarResenasCSV);
router.get('/:id/resenas/exportar', resenasController.exportarResenasCSV);

export default router;
