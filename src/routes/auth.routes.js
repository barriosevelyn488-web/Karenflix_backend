import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { validarRegistro, validarLogin } from '../validators/auth.validator.js';
import { validate } from '../middlewares/validate.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

// Registro y Login
router.post('/register', validarRegistro, validate, authController.registrar);
router.post('/login', validarLogin, validate, authController.login);

// Información del usuario autenticado
router.get('/me', requireAuth, authController.me);
router.get('/perfil', requireAuth, authController.obtenerPerfil);
router.put('/perfil', requireAuth, authController.actualizarPerfil);
router.post('/logout', authController.logout);

export default router;
