import { BaseEntity } from './BaseEntity.js';

export class Usuario extends BaseEntity {
  #nombre;
  #email;
  #password_hash;
  #rol;

  constructor({ id = null, nombre, email, password_hash = null, rol = 'usuario', created_at = null }) {
    super(id, created_at);
    this.nombre = nombre;
    this.email = email;
    this.#password_hash = password_hash;
    this.rol = rol;
  }

  get nombre() {
    return this.#nombre;
  }

  set nombre(valor) {
    if (!valor || typeof valor !== 'string' || valor.trim().length === 0) {
      throw new Error('El nombre de usuario no puede estar vacío');
    }
    this.#nombre = valor.trim();
  }

  get email() {
    return this.#email;
  }

  set email(valor) {
    if (!valor || !valor.includes('@')) {
      throw new Error('El formato del correo electrónico no es válido');
    }
    this.#email = valor.trim().toLowerCase();
  }

  get rol() {
    return this.#rol;
  }

  set rol(valor) {
    const rolesValidos = ['usuario', 'admin'];
    if (!rolesValidos.includes(valor)) {
      throw new Error(`Rol inválido: ${valor}`);
    }
    this.#rol = valor;
  }

  get password_hash() {
    return this.#password_hash;
  }

  esAdmin() {
    return this.#rol === 'admin';
  }

  validar() {
    return Boolean(this.#nombre && this.#email && this.#email.includes('@'));
  }

  toJSON() {
    return {
      ...super.toJSON(),
      nombre: this.#nombre,
      email: this.#email,
      rol: this.#rol
    };
  }
}
