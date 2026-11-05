import { Router } from 'express';
import { usuariosController } from '../controllers/usuarios.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { requireAdmin } from '../middlewares/roles.js';

const router = Router();

// Todas las rutas de administración de usuarios requieren autenticación y rol de admin
router.use(requireAuth, requireAdmin);

router.get('/', usuariosController.listarUsuarios);
router.get('/:id', usuariosController.obtenerUsuario);
router.put('/:id', usuariosController.actualizarUsuario);
router.delete('/:id', usuariosController.eliminarUsuario);

export default router;
