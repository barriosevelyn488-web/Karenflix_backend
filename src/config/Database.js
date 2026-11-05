import mysql from 'mysql2/promise';
import { config } from './config.js';

export class Database {
  static #instance = null;

  constructor() {
    if (Database.#instance) {
      return Database.#instance;
    }

    this.pool = mysql.createPool({
      host: config.db.host,
      port: config.db.port,
      user: config.db.user,
      password: config.db.password,
      database: config.db.name,
      waitForConnections: true,
      connectionLimit: config.db.connectionLimit || 10,
      queueLimit: 0,
      charset: 'utf8mb4',
      ssl: config.db.ssl
        ? { ca: config.db.ca || undefined, rejectUnauthorized: Boolean(config.db.ca) }
        : undefined
    });

    Database.#instance = this;
  }

  static getInstance() {
    if (!Database.#instance) {
      Database.#instance = new Database();
    }
    return Database.#instance;
  }

  async query(sql, params = []) {
    return this.pool.query(sql, params);
  }

  async getConnection() {
    return this.pool.getConnection();
  }

  async transaction(callback) {
    const connection = await this.getConnection();
    try {
      await connection.beginTransaction();
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

export const db = Database.getInstance();
