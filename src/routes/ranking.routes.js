import { Router } from 'express';
import { obtenerRanking } from '../controllers/ranking.controller.js';

const router = Router();

router.get('/', obtenerRanking);

export default router;
