import pool from '../config/db.js';

/**
 * BaseModel genérico con encapsulamiento puro (#) y construcción de consultas dinámicas.
 * Implementa el patrón ActiveRecord / Base Repository común para operaciones CRUD en MySQL.
 */
export default class BaseModel {
  #dbConn;
  #table;

  constructor(repo, dbConnection = pool) {
    this.#table = repo;
    this.#dbConn = dbConnection;
  }

  get table() {
    return this.#table;
  }

  get dbConn() {
    return this.#dbConn;
  }

  async create(data) {
    try {
      const fields = Object.keys(data).filter((k) => data[k] !== undefined);
      const query = `INSERT INTO ${this.#table} ( ${fields.join(', ')} ) VALUES ( ${fields.map(() => '?').join(', ')} )`;
      const [result] = await this.#dbConn.execute(
        query,
        fields.map((f) => data[f])
      );
      return result.insertId;
    } catch (err) {
      console.error(`Error en create de ${this.#table}:`, err);
      throw err;
    }
  }

  async getAll() {
    try {
      const [rows] = await this.#dbConn.query(`SELECT * FROM ${this.#table}`);
      return rows;
    } catch (err) {
      console.error(`Error en getAll de ${this.#table}:`, err);
      throw err;
    }
  }

  async getById(id) {
    try {
      const [rows] = await this.#dbConn.query(`SELECT * FROM ${this.#table} WHERE id = ?`, [id]);
      return rows[0] || null;
    } catch (err) {
      console.error(`Error en getById de ${this.#table}:`, err);
      throw err;
    }
  }

  async update(id, data) {
    try {
      const fields = Object.keys(data).filter((k) => data[k] !== undefined && k !== 'id');
      const setClause = fields.map((f) => `${f} = ?`).join(', ');
      const query = `UPDATE ${this.#table} SET ${setClause} WHERE id = ?`;
      const [result] = await this.#dbConn.execute(query, [...fields.map((f) => data[f]), id]);
      return result.affectedRows > 0;
    } catch (err) {
      console.error(`Error en update de ${this.#table}:`, err);
      throw err;
    }
  }

  async delete(id) {
    try {
      const [result] = await this.#dbConn.execute(`DELETE FROM ${this.#table} WHERE id = ?`, [id]);
      return result.affectedRows > 0;
    } catch (err) {
      console.error(`Error en delete de ${this.#table}:`, err);
      throw err;
    }
  }
}
