import { BaseEntity } from './BaseEntity.js';

export class Resena extends BaseEntity {
  #pelicula_id;
  #usuario_id;
  #usuario_nombre;
  #titulo;
  #comentario;
  #calificacion;
  #likes;
  #dislikes;
  #updated_at;

  constructor({
    id = null,
    pelicula_id,
    usuario_id,
    usuario_nombre = null,
    titulo = '',
    comentario = '',
    calificacion,
    likes = 0,
    dislikes = 0,
    created_at = null,
    updated_at = null
  }) {
    super(id, created_at);
    this.#pelicula_id = pelicula_id;
    this.#usuario_id = usuario_id;
    this.#usuario_nombre = usuario_nombre;
    this.titulo = titulo;
    this.comentario = comentario;
    this.calificacion = calificacion;
    this.#likes = Number(likes) || 0;
    this.#dislikes = Number(dislikes) || 0;
    this.#updated_at = updated_at;
  }

  get pelicula_id() { return this.#pelicula_id; }
  get usuario_id() { return this.#usuario_id; }
  get usuario_nombre() { return this.#usuario_nombre; }

  get titulo() { return this.#titulo; }
  set titulo(valor) { this.#titulo = valor ? String(valor).trim() : 'Reseña'; }

  get comentario() { return this.#comentario; }
  set comentario(valor) {
    if (!valor || !String(valor).trim()) throw new Error('El comentario no puede estar vacío');
    this.#comentario = String(valor).trim();
  }

  get calificacion() { return this.#calificacion; }
  set calificacion(valor) {
    const num = Number(valor);
    if (isNaN(num) || num < 1 || num > 10) {
      throw new Error('La calificación debe estar entre 1 y 10');
    }
    this.#calificacion = Math.round(num);
  }

  get likes() { return this.#likes; }
  get dislikes() { return this.#dislikes; }
  get updated_at() { return this.#updated_at; }

  validar() {
    return Boolean(this.#pelicula_id && this.#usuario_id && this.#calificacion >= 1 && this.#calificacion <= 10);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      pelicula_id: this.#pelicula_id,
      usuario_id: this.#usuario_id,
      usuario_nombre: this.#usuario_nombre,
      autor: this.#usuario_nombre,
      titulo: this.#titulo,
      comentario: this.#comentario,
      calificacion: this.#calificacion,
      likes: this.#likes,
      dislikes: this.#dislikes,
      updated_at: this.#updated_at
    };
  }
}
