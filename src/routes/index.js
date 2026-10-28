import { Router } from 'express';
import semver from 'semver';
import authRoutes from './auth.routes.js';
import categoriasRoutes from './categorias.routes.js';
import peliculasRoutes from './peliculas.routes.js';
import resenasRoutes from './resenas.routes.js';
import rankingRoutes from './ranking.routes.js';

const router = Router();

router.get('/version', (req, res) => {
  res.status(200).json({
    status: 'success',
    name: 'karenflix-backend',
    version: '0.1.0',
    semverValid: semver.valid('0.1.0')
  });
});

router.use('/auth', authRoutes);
router.use('/categorias', categoriasRoutes);
router.use('/peliculas', peliculasRoutes);
router.use('/resenas', resenasRoutes);
router.use('/ranking', rankingRoutes);

export default router;
