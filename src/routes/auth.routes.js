import { Router } from 'express';
import { registrar, login, logout, me, actualizarPerfil } from '../controllers/auth.controller.js';
import { validarRegistro, validarLogin } from '../validators/auth.validator.js';
import { validate } from '../middlewares/validate.js';
import { requireAuth } from '../middlewares/auth.js';
import { authRateLimit } from '../middlewares/rateLimit.js';

const router = Router();

// Conecta los endpoints de sesión con sus validadores, límites y controladores.
router.post('/register', authRateLimit, validarRegistro, validate, registrar);
router.post('/login', authRateLimit, validarLogin, validate, login);
router.post('/logout', logout);
router.get('/me', requireAuth, me);
router.put('/perfil', requireAuth, actualizarPerfil);

export default router;
