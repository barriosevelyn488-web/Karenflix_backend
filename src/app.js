import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { randomUUID } from 'node:crypto';
import router from './routes/index.js';
import './config/passport.js';
import { config } from './config/config.js';
import { env } from './config/env.js';
import { swaggerMiddleware } from './config/swagger.js';

const app = express();

if (process.env.TRUST_PROXY === 'true') app.set('trust proxy', 1);
app.disable('x-powered-by');

// Identificador único por petición
app.use((req, res, next) => {
  req.id = randomUUID();
  res.setHeader('X-Request-Id', req.id);
  next();
});

app.use(helmet());

// Lista de orígenes permitidos
const defaultOrigins = [
  'http://localhost:3000',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:5501',
  'http://127.0.0.1:5501',
  'https://karenflix-frontend.vercel.app'
];
const envOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);
const allowedOrigins = new Set([...defaultOrigins, ...envOrigins]);

app.use(
  cors({
    origin(origin, callback) {
      // Permitir herramientas como Bruno, Postman, curl o server-to-server
      if (!origin) return callback(null, true);

      // Permitir subdominios de Vercel (karenflix-frontend.vercel.app y previews)
      if (origin.endsWith('.vercel.app') || allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Bloqueado por política CORS: origen no autorizado'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token']
  })
);

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '20kb' }));

// Documentación interactiva Swagger
app.use(
  '/api-docs',
  (req, res, next) => {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' data:; connect-src 'self'"
    );
    next();
  },
  ...swaggerMiddleware
);

// Health check para monitorización y despliegue
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Rutas de la API v1 (POO)
app.use('/api/v1', router);

// Manejador de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
  });
});

// Manejador centralizado de errores
app.use((err, req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const status = statusCode >= 500 ? 'error' : 'fail';

  if (process.env.NODE_ENV !== 'production' && statusCode >= 500) {
    console.error('[Error]:', err);
  }

  res.status(statusCode).json({
    status,
    message: err.message || 'Error interno del servidor',
    error: {
      code: err.code || (statusCode >= 500 ? 'INTERNAL_ERROR' : 'ERROR'),
      message: err.message || 'Error interno del servidor'
    }
  });
});

export default app;
