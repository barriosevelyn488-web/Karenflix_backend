import { BaseEntity } from './BaseEntity.js';

export class Categoria extends BaseEntity {
  #nombre;
  #descripcion;

  constructor({ id = null, nombre, descripcion = '', created_at = null }) {
    super(id, created_at);
    this.nombre = nombre;
    this.descripcion = descripcion;
  }

  get nombre() {
    return this.#nombre;
  }

  set nombre(valor) {
    if (!valor || typeof valor !== 'string' || valor.trim().length === 0) {
      throw new Error('El nombre de la categoría es obligatorio');
    }
    this.#nombre = valor.trim();
  }

  get descripcion() {
    return this.#descripcion;
  }

  set descripcion(valor) {
    this.#descripcion = valor ? String(valor).trim() : '';
  }

  validar() {
    return Boolean(this.#nombre && this.#nombre.trim().length > 0);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      nombre: this.#nombre,
      descripcion: this.#descripcion
    };
  }
}
