import { Database } from '../config/Database.js';

export class BaseModel {
  constructor() {
    this.db = Database.getInstance();
  }

  async query(sql, params = []) {
    return this.db.query(sql, params);
  }

  async transaction(callback) {
    return this.db.transaction(callback);
  }
}
