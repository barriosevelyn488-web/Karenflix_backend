-- =============================================================================
-- KARENFLIX DATABASE SCHEMA (MySQL 8 / Aiven Cloud)
-- Modelo Relacional Normalizado (3FN) con Integridad Referencial
-- =============================================================================

CREATE DATABASE IF NOT EXISTS karenflix;
USE karenflix;

-- =============================================================================
-- 1. TABLA: USUARIOS (Autenticación, Roles y Gestión de Cuentas)
-- =============================================================================
CREATE TABLE IF NOT EXISTS usuarios (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  rol           ENUM('usuario', 'admin') NOT NULL DEFAULT 'usuario',
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT uq_usuarios_email UNIQUE (email)
);


-- =============================================================================
-- 2. TABLA: CATEGORÍAS (Géneros cinematográficos)
-- =============================================================================
CREATE TABLE IF NOT EXISTS categorias (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(100) NOT NULL,
  descripcion TEXT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT uq_categorias_nombre UNIQUE (nombre)
);


-- =============================================================================
-- 3. TABLA: DIRECTORES (Personal de dirección)
-- =============================================================================
CREATE TABLE IF NOT EXISTS directores (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre     VARCHAR(150) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT uq_directores_nombre UNIQUE (nombre)
);


-- =============================================================================
-- 4. TABLA: ACTORES (Elenco y reparto)
-- =============================================================================
CREATE TABLE IF NOT EXISTS actores (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre     VARCHAR(150) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT uq_actores_nombre UNIQUE (nombre)
);


-- =============================================================================
-- 5. TABLA: PELÍCULAS (Catálogo principal de títulos, series y animes)
-- =============================================================================
CREATE TABLE IF NOT EXISTS peliculas (
  id                 INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titulo             VARCHAR(150) NOT NULL,
  titulo_normalizado VARCHAR(150) NOT NULL,
  descripcion        TEXT NOT NULL,
  duracion_minutos   SMALLINT UNSIGNED NULL,
  tipo               ENUM('pelicula', 'serie', 'anime') NOT NULL,
  anio               SMALLINT UNSIGNED NOT NULL,
  categoria_id       INT UNSIGNED NOT NULL,
  director_id        INT UNSIGNED NULL,
  imagen_url         VARCHAR(2048) NULL,
  trailer_url        VARCHAR(2048) NULL,
  estado             ENUM('pendiente', 'aprobada', 'rechazada') NOT NULL DEFAULT 'pendiente',
  creado_por         INT UNSIGNED NULL,
  aprobado_por       INT UNSIGNED NULL,
  rating_promedio    DECIMAL(4,2) NOT NULL DEFAULT 0.00,
  total_resenas      INT UNSIGNED NOT NULL DEFAULT 0,
  created_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- Claves únicas e Índices de consulta rápida
  CONSTRAINT uq_peliculas_titulo_normalizado UNIQUE (titulo_normalizado),
  INDEX ix_peliculas_estado_categoria (estado, categoria_id),
  INDEX ix_peliculas_rating (rating_promedio, total_resenas),

  -- Claves Foráneas
  CONSTRAINT fk_peliculas_categoria 
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) 
    ON DELETE RESTRICT,

  CONSTRAINT fk_peliculas_director 
    FOREIGN KEY (director_id) REFERENCES directores(id) 
    ON DELETE SET NULL,

  CONSTRAINT fk_peliculas_creador 
    FOREIGN KEY (creado_por) REFERENCES usuarios(id) 
    ON DELETE SET NULL,

  CONSTRAINT fk_peliculas_aprobador 
    FOREIGN KEY (aprobado_por) REFERENCES usuarios(id) 
    ON DELETE SET NULL,

  -- Validaciones de Dominio (Check Constraints)
  CONSTRAINT ck_peliculas_anio CHECK (anio >= 1888),
  CONSTRAINT ck_peliculas_rating CHECK (rating_promedio BETWEEN 0 AND 10)
);


-- =============================================================================
-- 6. TABLA INTERMEDIA: PELICULA_ACTOR (Relación Muchos a Muchos N:M)
-- =============================================================================
CREATE TABLE IF NOT EXISTS pelicula_actor (
  pelicula_id INT UNSIGNED NOT NULL,
  actor_id    INT UNSIGNED NOT NULL,

  PRIMARY KEY (pelicula_id, actor_id),

  CONSTRAINT fk_pelicula_actor_pelicula 
    FOREIGN KEY (pelicula_id) REFERENCES peliculas(id) 
    ON DELETE CASCADE,

  CONSTRAINT fk_pelicula_actor_actor 
    FOREIGN KEY (actor_id) REFERENCES actores(id) 
    ON DELETE CASCADE
);


-- =============================================================================
-- 7. TABLA: RESEÑAS (Comentarios y valoraciones del 1 al 10 por usuario)
-- =============================================================================
CREATE TABLE IF NOT EXISTS resenas (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  pelicula_id  INT UNSIGNED NOT NULL,
  usuario_id   INT UNSIGNED NOT NULL,
  titulo       VARCHAR(150) NOT NULL,
  comentario   TEXT NOT NULL,
  calificacion TINYINT UNSIGNED NOT NULL,
  likes        INT UNSIGNED NOT NULL DEFAULT 0,
  dislikes     INT UNSIGNED NOT NULL DEFAULT 0,
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- Un usuario solo puede dejar una reseña por título
  CONSTRAINT uq_resenas_usuario_pelicula UNIQUE (pelicula_id, usuario_id),
  INDEX ix_resenas_pelicula_fecha (pelicula_id, created_at),

  CONSTRAINT fk_resenas_pelicula 
    FOREIGN KEY (pelicula_id) REFERENCES peliculas(id) 
    ON DELETE CASCADE,

  CONSTRAINT fk_resenas_usuario 
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) 
    ON DELETE CASCADE,

  CONSTRAINT ck_resenas_calificacion CHECK (calificacion BETWEEN 1 AND 10)
);


-- =============================================================================
-- 8. TABLA: REACCIONES (Interacciones de Me gusta / No me gusta en reseñas)
-- =============================================================================
CREATE TABLE IF NOT EXISTS reacciones (
  usuario_id INT UNSIGNED NOT NULL,
  resena_id  INT UNSIGNED NOT NULL,
  tipo       ENUM('like', 'dislike') NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (usuario_id, resena_id),
  INDEX ix_reacciones_resena (resena_id),

  CONSTRAINT fk_reacciones_usuario 
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) 
    ON DELETE CASCADE,

  CONSTRAINT fk_reacciones_resena 
    FOREIGN KEY (resena_id) REFERENCES resenas(id) 
    ON DELETE CASCADE
);


-- =============================================================================
-- 9. TABLA: FAVORITOS (Marcadores personales de películas por usuario)
-- =============================================================================
CREATE TABLE IF NOT EXISTS favoritos (
  usuario_id  INT UNSIGNED NOT NULL,
  pelicula_id INT UNSIGNED NOT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (usuario_id, pelicula_id),

  CONSTRAINT fk_favoritos_usuario 
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) 
    ON DELETE CASCADE,

  CONSTRAINT fk_favoritos_pelicula 
    FOREIGN KEY (pelicula_id) REFERENCES peliculas(id) 
    ON DELETE CASCADE
);
