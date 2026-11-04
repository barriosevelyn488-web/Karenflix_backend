import { Router } from 'express';
import { favoritosController } from '../controllers/favoritos.controller.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

router.get('/', requireAuth, favoritosController.listarFavoritos);
router.post('/', requireAuth, favoritosController.agregarFavorito);
router.delete('/:id', requireAuth, favoritosController.eliminarFavorito);

export default router;

