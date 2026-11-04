import { BaseEntity } from './BaseEntity.js';

/**
 * Entidad de Dominio Categoria (POO)
 * - Herencia: extends BaseEntity
 * - Encapsulamiento: atributos privados (#), getters y setters
 * - Polimorfismo: sobrescritura de toJSON() y validar()
 */
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

  /**
   * Sobrescritura polimórfica de validar()
   */
  validar() {
    return Boolean(this.#nombre && this.#nombre.trim().length > 0);
  }

  /**
   * Sobrescritura polimórfica de toJSON()
   */
  toJSON() {
    return {
      ...super.toJSON(),
      nombre: this.#nombre,
      descripcion: this.#descripcion
    };
  }
}
