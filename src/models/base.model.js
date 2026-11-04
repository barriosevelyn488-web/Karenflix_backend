import { Database } from '../config/Database.js';

/**
 * Clase base para modelos de datos (POO)
 */
export class BaseModel {
  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * Ejecuta una consulta SQL en la base de datos.
   * @param {string} sql
   * @param {Array} params
   */
  async query(sql, params = []) {
    return this.db.query(sql, params);
  }

  /**
   * Ejecuta transacciones con auto commit / rollback.
   * @param {Function} callback
   */
  async transaction(callback) {
    return this.db.transaction(callback);
  }
}

