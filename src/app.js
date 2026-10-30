import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { randomUUID } from 'node:crypto';
import router from './routes/index.js';
import './config/passport.js';
import { env } from './config/env.js';
import { apiRateLimit } from './middlewares/rateLimit.js';
import { csrfGuard } from './middlewares/csrf.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import { swaggerMiddleware } from './config/swagger.js';

const app = express();

if (env.trustProxy) app.set('trust proxy', 1);
app.disable('x-powered-by');

// Identifica cada solicitud para relacionar respuestas y errores con sus registros.
app.use((req, res, next) => {
  req.id = randomUUID();
  res.setHeader('X-Request-Id', req.id);
  next();
});

app.use(helmet());
app.use(
  cors({
    origin(origin, cb) {
      if (!origin || env.corsOrigins.includes(origin)) return cb(null, true);
      return cb(new Error('Origen no permitido por CORS.'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token']
  })
);

// Los parsers deben ejecutarse antes de las rutas que leen req.body.
app.use(express.json({ limit: '100kb', strict: true }));
app.use(express.urlencoded({ extended: false, limit: '20kb' }));

app.use(
  '/api-docs',
  (req, res, next) => {
    // Swagger UI builds its page with an inline bootstrap script; scope that exception to docs only.
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'"
    );
    next();
  },
  ...swaggerMiddleware
);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Los middlewares de API protegen las rutas montadas bajo esta versión.
app.use('/api/v1', apiRateLimit, csrfGuard, router);

// Express requiere que el manejador de errores vaya al final de la cadena.
app.use(notFound);
app.use(errorHandler);

export default app;
