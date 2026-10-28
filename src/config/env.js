import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'karenflix'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secreto',
    expiresIn: process.env.JWT_EXPIRES_IN || '2h'
  },
  corsOrigin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*'
};
