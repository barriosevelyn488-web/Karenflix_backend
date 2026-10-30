import { Router } from 'express';
import semver from 'semver';
import authRoutes from './auth.routes.js';
import categoriasRoutes from './categorias.routes.js';
import peliculasRoutes from './peliculas.routes.js';
import resenasRoutes from './resenas.routes.js';
import rankingRoutes from './ranking.routes.js';
import { env } from '../config/env.js';

const router = Router();

// Punto de montaje común: cada prefijo conecta con el router de su recurso.
router.get('/version', (_req, res) =>
  res.json({
    status: 'success',
    name: 'karenflix-backend',
    version: env.apiVersion,
    semverValid: semver.valid(env.apiVersion)
  })
);
router.use('/auth', authRoutes);
router.use('/categorias', categoriasRoutes);
router.use('/peliculas', peliculasRoutes);
router.use('/resenas', resenasRoutes);
router.use('/ranking', rankingRoutes);

export default router;
