import { BaseEntity } from './BaseEntity.js';

/**
 * Entidad de Dominio Pelicula / Serie (POO)
 * - Herencia: extends BaseEntity
 * - Encapsulamiento: atributos privados (#), getters y setters
 * - Polimorfismo: sobrescritura de toJSON() y validar()
 */
export class Pelicula extends BaseEntity {
  #titulo;
  #titulo_normalizado;
  #descripcion;
  #duracion_minutos;
  #tipo;
  #anio;
  #categoria_id;
  #categoria_nombre;
  #director_id;
  #director_nombre;
  #imagen_url;
  #estado;
  #creado_por;
  #aprobado_por;
  #rating_promedio;
  #total_resenas;

  constructor({
    id = null,
    titulo,
    titulo_normalizado = '',
    descripcion = '',
    duracion_minutos = null,
    tipo = 'pelicula',
    anio = new Date().getFullYear(),
    categoria_id,
    categoria_nombre = null,
    director_id = null,
    director_nombre = null,
    imagen_url = null,
    estado = 'pendiente',
    creado_por = null,
    aprobado_por = null,
    rating_promedio = 0,
    total_resenas = 0,
    created_at = null
  }) {
    super(id, created_at);
    this.titulo = titulo;
    this.#titulo_normalizado = titulo_normalizado;
    this.descripcion = descripcion;
    this.duracion_minutos = duracion_minutos;
    this.tipo = tipo;
    this.anio = anio;
    this.categoria_id = categoria_id;
    this.#categoria_nombre = categoria_nombre;
    this.#director_id = director_id;
    this.#director_nombre = director_nombre;
    this.#imagen_url = imagen_url;
    this.estado = estado;
    this.#creado_por = creado_por;
    this.#aprobado_por = aprobado_por;
    this.#rating_promedio = Number(rating_promedio) || 0;
    this.#total_resenas = Number(total_resenas) || 0;
  }

  // --- Getters & Setters ---
  get titulo() { return this.#titulo; }
  set titulo(valor) {
    if (!valor || typeof valor !== 'string') throw new Error('El título es obligatorio');
    this.#titulo = valor.trim();
  }

  get titulo_normalizado() { return this.#titulo_normalizado; }
  get descripcion() { return this.#descripcion; }
  set descripcion(valor) { this.#descripcion = valor ? String(valor).trim() : ''; }

  get duracion_minutos() { return this.#duracion_minutos; }
  set duracion_minutos(valor) { this.#duracion_minutos = valor ? Number(valor) : null; }

  get tipo() { return this.#tipo; }
  set tipo(valor) {
    const tipos = ['pelicula', 'serie', 'anime'];
    if (!tipos.includes(valor)) throw new Error(`Tipo inválido: ${valor}. Debe ser: ${tipos.join(', ')}`);
    this.#tipo = valor;
  }

  get anio() { return this.#anio; }
  set anio(valor) { this.#anio = Number(valor); }

  get categoria_id() { return this.#categoria_id; }
  set categoria_id(valor) { this.#categoria_id = Number(valor); }

  get categoria_nombre() { return this.#categoria_nombre; }
  get director_id() { return this.#director_id; }
  get director_nombre() { return this.#director_nombre; }
  get imagen_url() { return this.#imagen_url; }

  get estado() { return this.#estado; }
  set estado(valor) {
    const estados = ['pendiente', 'aprobada', 'rechazada'];
    if (!estados.includes(valor)) throw new Error(`Estado inválido: ${valor}`);
    this.#estado = valor;
  }

  get rating_promedio() { return this.#rating_promedio; }
  get total_resenas() { return this.#total_resenas; }
  get creado_por() { return this.#creado_por; }
  get aprobado_por() { return this.#aprobado_por; }

  estaAprobada() {
    return this.#estado === 'aprobada';
  }

  /**
   * Sobrescritura polimórfica de validar()
   */
  validar() {
    return Boolean(this.#titulo && this.#tipo && this.#categoria_id);
  }

  /**
   * Sobrescritura polimórfica de toJSON()
   */
  toJSON() {
    return {
      ...super.toJSON(),
      titulo: this.#titulo,
      titulo_normalizado: this.#titulo_normalizado,
      descripcion: this.#descripcion,
      duracion_minutos: this.#duracion_minutos,
      tipo: this.#tipo,
      anio: this.#anio,
      categoria_id: this.#categoria_id,
      categoria_nombre: this.#categoria_nombre,
      categoria: this.#categoria_nombre,
      director_id: this.#director_id,
      director_nombre: this.#director_nombre,
      imagen_url: this.#imagen_url,
      estado: this.#estado,
      creado_por: this.#creado_por,
      aprobado_por: this.#aprobado_por,
      rating_promedio: this.#rating_promedio,
      total_resenas: this.#total_resenas
    };
  }
}
