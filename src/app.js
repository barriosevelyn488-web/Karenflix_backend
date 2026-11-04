import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import './config/passport.js';

const app = express();

app.use(cors());
app.use(express.json());

// Montaje de rutas con versión API v1
app.use('/api/v1', router);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = statusCode >= 500 ? 'error' : 'fail';

  if (process.env.NODE_ENV !== 'production' && statusCode >= 500) {
    console.error('[Error no controlado]:', err);
  }

  res.status(statusCode).json({
    status,
    message: err.message || 'Error interno del servidor'
  });
});

export default app;
