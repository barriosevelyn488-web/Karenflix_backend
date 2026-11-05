import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET no configurado en entorno de producción');
}

export const config = Object.freeze({
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  apiVersion: '0.1.0',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'karenflix',
    ssl: process.env.DB_SSL === 'true',
    ca: process.env.DB_CA?.replace(/\\n/g, '\n'),
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10
  },
  jwt: {
    secret: jwtSecret || 'dev_secret_key',
    expiresIn: process.env.JWT_EXPIRES_IN || '2h',
    cookieName: process.env.JWT_COOKIE_NAME || 'karenflix_token'
  },
  corsOrigin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
    : ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:5501', 'http://127.0.0.1:5501', 'https://karenflix-frontend.vercel.app']
});

export default config;
