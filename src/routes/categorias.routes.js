import { Router } from 'express';
import { categoriasController } from '../controllers/categorias.controller.js';
import { validarCategoria } from '../validators/categorias.validator.js';
import { validate } from '../middlewares/validate.js';
import { requireAuth } from '../middlewares/auth.js';
import { requireAdmin } from '../middlewares/roles.js';

const router = Router();

router.get('/', categoriasController.listarCategorias);
router.post('/', requireAuth, requireAdmin, validarCategoria, validate, categoriasController.crearCategoria);
router.put('/:id', requireAuth, requireAdmin, validarCategoria, validate, categoriasController.actualizarCategoria);
router.delete('/:id', requireAuth, requireAdmin, categoriasController.eliminarCategoria);

export default router;
