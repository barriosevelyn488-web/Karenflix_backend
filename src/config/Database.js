import mysql from 'mysql2/promise';
import { config } from './config.js';

/**
 * Clase Database (Patrón Singleton)
 * Centraliza y administra el pool de conexiones MySQL para toda la aplicación.
 */
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
      connectionLimit: 10,
      queueLimit: 0
    });

    Database.#instance = this;
  }

  /**
   * Obtiene la instancia única de la base de datos (Singleton).
   * @returns {Database}
   */
  static getInstance() {
    if (!Database.#instance) {
      Database.#instance = new Database();
    }
    return Database.#instance;
  }

  /**
   * Ejecuta una consulta SQL en el pool.
   * @param {string} sql
   * @param {Array} params
   * @returns {Promise<[any[], any]>}
   */
  async query(sql, params = []) {
    return this.pool.query(sql, params);
  }

  /**
   * Obtiene una conexión dedicada del pool (para transacciones).
   * @returns {Promise<import('mysql2/promise').PoolConnection>}
   */
  async getConnection() {
    return this.pool.getConnection();
  }

  /**
   * Ejecuta un callback dentro de una transacción gestionada automáticamente.
   * @param {Function} callback (connection) => Promise<any>
   * @returns {Promise<any>}
   */
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

