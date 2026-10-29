CREATE DATABASE IF NOT EXISTS karenflix CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE karenflix;
CREATE TABLE IF NOT EXISTS usuarios (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 nombre VARCHAR(100) NOT NULL,
 email VARCHAR(150) NOT NULL,
 password_hash VARCHAR(255) NOT NULL,
 rol ENUM('usuario','admin') NOT NULL DEFAULT 'usuario',
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE KEY uq_usuarios_email(email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS categorias (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 nombre VARCHAR(100) NOT NULL,
 descripcion TEXT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE KEY uq_categorias_nombre(nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS directores (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 nombre VARCHAR(150) NOT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE KEY uq_directores_nombre(nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS actores (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 nombre VARCHAR(150) NOT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE KEY uq_actores_nombre(nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS peliculas (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 titulo VARCHAR(150) NOT NULL,
 titulo_normalizado VARCHAR(150) NOT NULL,
 descripcion TEXT NOT NULL,
 duracion_minutos SMALLINT UNSIGNED NULL,
 tipo ENUM('pelicula','serie','anime') NOT NULL,
 anio SMALLINT UNSIGNED NOT NULL,
 categoria_id INT UNSIGNED NOT NULL,
 director_id INT UNSIGNED NULL,
 imagen_url VARCHAR(2048) NULL,
 trailer_url VARCHAR(2048) NULL,
 estado ENUM('pendiente','aprobada','rechazada') NOT NULL DEFAULT 'pendiente',
 creado_por INT UNSIGNED NULL,
 aprobado_por INT UNSIGNED NULL,
 rating_promedio DECIMAL(4,2) NOT NULL DEFAULT 0,
 total_resenas INT UNSIGNED NOT NULL DEFAULT 0,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 UNIQUE KEY uq_peliculas_titulo_normalizado(titulo_normalizado),
 KEY ix_peliculas_estado_categoria(estado,categoria_id),
 KEY ix_peliculas_rating(rating_promedio,total_resenas),
 CONSTRAINT fk_peliculas_categoria FOREIGN KEY(categoria_id) REFERENCES categorias(id) ON DELETE RESTRICT,
 CONSTRAINT fk_peliculas_director FOREIGN KEY(director_id) REFERENCES directores(id) ON DELETE SET NULL,
 CONSTRAINT fk_peliculas_creador FOREIGN KEY(creado_por) REFERENCES usuarios(id) ON DELETE SET NULL,
 CONSTRAINT fk_peliculas_aprobador FOREIGN KEY(aprobado_por) REFERENCES usuarios(id) ON DELETE SET NULL,
 CONSTRAINT ck_peliculas_anio CHECK(anio>=1888),
 CONSTRAINT ck_peliculas_rating CHECK(rating_promedio BETWEEN 0 AND 10)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS pelicula_actor (
 pelicula_id INT UNSIGNED NOT NULL,
 actor_id INT UNSIGNED NOT NULL,
 PRIMARY KEY(pelicula_id,actor_id),
 CONSTRAINT fk_pelicula_actor_pelicula FOREIGN KEY(pelicula_id) REFERENCES peliculas(id) ON DELETE CASCADE,
 CONSTRAINT fk_pelicula_actor_actor FOREIGN KEY(actor_id) REFERENCES actores(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS resenas (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 pelicula_id INT UNSIGNED NOT NULL,
 usuario_id INT UNSIGNED NOT NULL,
 titulo VARCHAR(150) NOT NULL,
 comentario TEXT NOT NULL,
 calificacion TINYINT UNSIGNED NOT NULL,
 likes INT UNSIGNED NOT NULL DEFAULT 0,
 dislikes INT UNSIGNED NOT NULL DEFAULT 0,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 UNIQUE KEY uq_resenas_usuario_pelicula(pelicula_id,usuario_id),
 KEY ix_resenas_pelicula_fecha(pelicula_id,created_at),
 CONSTRAINT fk_resenas_pelicula FOREIGN KEY(pelicula_id) REFERENCES peliculas(id) ON DELETE CASCADE,
 CONSTRAINT fk_resenas_usuario FOREIGN KEY(usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
 CONSTRAINT ck_resenas_calificacion CHECK(calificacion BETWEEN 1 AND 10)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS reacciones (
 usuario_id INT UNSIGNED NOT NULL,
 resena_id INT UNSIGNED NOT NULL,
 tipo ENUM('like','dislike') NOT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY(usuario_id,resena_id),
 KEY ix_reacciones_resena(resena_id),
 CONSTRAINT fk_reacciones_usuario FOREIGN KEY(usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
 CONSTRAINT fk_reacciones_resena FOREIGN KEY(resena_id) REFERENCES resenas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS favoritos (
 usuario_id INT UNSIGNED NOT NULL,
 pelicula_id INT UNSIGNED NOT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY(usuario_id,pelicula_id),
 CONSTRAINT fk_favoritos_usuario FOREIGN KEY(usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
 CONSTRAINT fk_favoritos_pelicula FOREIGN KEY(pelicula_id) REFERENCES peliculas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
