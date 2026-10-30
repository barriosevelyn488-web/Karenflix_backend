import dotenv from 'dotenv';

dotenv.config();

const parseBoolean = (value, fallback = false) => (value == null ? fallback : value === 'true');
const requireProductionValue = (name, value) => {
  if (!value && process.env.NODE_ENV === 'production')
    throw new Error(`${name} es obligatorio en producción`);
  return value;
};

export const env = {
  port: Number(process.env.PORT || 3000),
  nodeEnv: process.env.NODE_ENV || 'development',
  apiVersion: process.env.npm_package_version || '0.1.0',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'karenflix',
    ssl: parseBoolean(process.env.DB_SSL),
    ca: process.env.DB_CA,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10)
  },
  jwt: {
    secret: requireProductionValue(
      'JWT_SECRET',
      process.env.JWT_SECRET ||
        (process.env.NODE_ENV === 'production' ? '' : 'dev-only-change-this-secret-32-chars-min')
    ),
    expiresIn: process.env.JWT_EXPIRES_IN || '2h',
    cookieName: process.env.JWT_COOKIE_NAME || 'karenflix_token'
  },
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5500,http://127.0.0.1:5500')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  trustProxy: process.env.TRUST_PROXY === 'true'
};

// Evita iniciar la API con una clave JWT demasiado corta.
if (env.jwt.secret.length < 32) throw new Error('JWT_SECRET debe tener al menos 32 caracteres');

// En producción se requieren credenciales explícitas y una conexión cifrada a MySQL.
if (env.nodeEnv === 'production') {
  if (
    [
      'replace-with-a-random-secret-at-least-32-characters-long',
      'dev-only-change-this-secret-32-chars-min'
    ].includes(env.jwt.secret)
  ) {
    throw new Error('JWT_SECRET debe ser una clave aleatoria propia en producción');
  }
  for (const key of ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'CORS_ORIGIN']) {
    if (!process.env[key]) throw new Error(`${key} es obligatorio en producción`);
  }
  if (!env.db.ssl) throw new Error('DB_SSL=true es obligatorio en producción');
}
