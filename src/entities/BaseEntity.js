/**
 * Clase Base para todas las Entidades del Dominio (POO)
 * Establece la estructura común y define métodos polimórficos que cada
 * entidad concreta sobrescribe (Method Overriding).
 */
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

  /**
   * Método polimórfico: Define la firma base para serializar entidades.
   * Cada subclase concreta (Usuario, Pelicula, Resena, Categoria) sobrescribe
   * este método para serializar sus propios atributos encapsulados.
   * @returns {object}
   */
  toJSON() {
    return {
      id: this.#id,
      created_at: this.#created_at
    };
  }

  /**
   * Método polimórfico de validación de reglas de negocio.
   * Cada entidad especializada implementa sus propias restricciones.
   * @returns {boolean}
   */
  validar() {
    return true;
  }
}

