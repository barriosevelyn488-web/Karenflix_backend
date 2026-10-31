import mysql from 'mysql2/promise';
import { env } from './env.js';

// Pool compartido por los modelos para reutilizar conexiones con MySQL (Local o Aiven Cloud).
const pool = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.name,
  waitForConnections: true,
  connectionLimit: env.db.connectionLimit,
  queueLimit: 0,
  charset: 'utf8mb4',
  timezone: 'Z',
  decimalNumbers: true,
  ssl: env.db.ssl ? { ca: env.db.ca || undefined, rejectUnauthorized: Boolean(env.db.ca) } : undefined
});

export const db = pool;

export const verificarConexion = async () => {
  const connection = await pool.getConnection();
  try {
    await connection.ping();
  } finally {
    connection.release();
  }
};

export const cerrarConexion = () => pool.end();

export default pool;
