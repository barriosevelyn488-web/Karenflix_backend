import express from 'express';
import cors from 'cors';
import { config } from './config/config.js';
import router from './routes/index.js';
import './config/passport.js';

const app = express();

const allowedOrigins = Array.isArray(config.corsOrigin)
  ? config.corsOrigin
  : [config.corsOrigin];

app.use(cors({
  origin: (origin, callback) => {
    // Permitir herramientas como Bruno, Postman, curl o server-to-server
    if (!origin) return callback(null, true);

    // Verificación exacta contra la lista blanca (evita subdominios arbitrarios *.vercel.app)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Bloqueado por política CORS: origen no autorizado'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/v1', router);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = statusCode >= 500 ? 'error' : 'fail';

  if (process.env.NODE_ENV !== 'production' && statusCode >= 500) {
    console.error('[Error]:', err);
  }

  res.status(statusCode).json({
    status,
    message: err.message || 'Error interno del servidor'
  });
});

export default app;
