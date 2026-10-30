import { Router } from 'express';
import {
  listarCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
} from '../controllers/categorias.controller.js';
import { validarCategoria } from '../validators/categorias.validator.js';
import { validate } from '../middlewares/validate.js';
import { requireAuth } from '../middlewares/auth.js';
import { requireAdmin } from '../middlewares/roles.js';
import { validarId } from '../validators/id.validator.js';

const router = Router();

// Las escrituras de categorías requieren autenticación y rol de administrador.
router.get('/', listarCategorias);
router.post('/', requireAuth, requireAdmin, validarCategoria, validate, crearCategoria);
router.put(
  '/:id',
  requireAuth,
  requireAdmin,
  validarId,
  validarCategoria,
  validate,
  actualizarCategoria
);
router.delete('/:id', requireAuth, requireAdmin, validarId, validate, eliminarCategoria);

export default router;
