import { Router } from 'express';
import { obtenerRanking } from '../controllers/ranking.controller.js';
import { validarLimiteRanking } from '../validators/peliculas.validator.js';
import { validate } from '../middlewares/validate.js';
const router = Router();
router.get('/', validarLimiteRanking, validate, obtenerRanking);
export default router;
