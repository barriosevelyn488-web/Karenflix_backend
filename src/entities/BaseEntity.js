export class BaseEntity {
  #id;
  #created_at;

  constructor(id = null, created_at = null) {
    this.#id = id;
    this.#created_at = created_at;
  }

  get id() {
    return this.#id;
  }

  get created_at() {
    return this.#created_at;
  }

  toJSON() {
    return {
      id: this.#id,
      created_at: this.#created_at
    };
  }

  validar() {
    return true;
  }
}
