
DROP DATABASE IF EXISTS karenflix;
CREATE DATABASE karenflix;
USE karenflix;

-- 1. USUARIOS
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  rol ENUM('usuario', 'admin') DEFAULT 'usuario',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. CATEGORÍAS (Géneros: Acción, Comedia, Anime, etc.)
CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  descripcion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. DIRECTORES (Normalizado para gestionar la autoría de forma limpia)
CREATE TABLE directores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. PELÍCULAS / SERIES / ANIME
CREATE TABLE peliculas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  titulo_normalizado VARCHAR(150) NOT NULL UNIQUE,
  descripcion TEXT NOT NULL,
  duracion_minutos INT UNSIGNED,
  tipo ENUM('pelicula', 'serie', 'anime') NOT NULL,
  anio INT NOT NULL,
  categoria_id INT NOT NULL,
  director_id INT, 
  imagen_url VARCHAR(255),
  estado ENUM('pendiente', 'aprobada', 'rechazada') DEFAULT 'pendiente',
  creado_por INT,
  aprobado_por INT,
  rating_promedio DECIMAL(3,2) DEFAULT 0.00,
  total_resenas INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE RESTRICT,
  FOREIGN KEY (director_id) REFERENCES directores(id) ON DELETE SET NULL,
  FOREIGN KEY (creado_por) REFERENCES usuarios(id) ON DELETE SET NULL,
  FOREIGN KEY (aprobado_por) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- 5. RESEÑAS 
CREATE TABLE resenas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pelicula_id INT NOT NULL,
  usuario_id INT NOT NULL,
  titulo VARCHAR(150) NOT NULL,
  comentario TEXT NOT NULL,
  calificacion TINYINT NOT NULL CHECK (calificacion BETWEEN 1 AND 10),
  likes INT DEFAULT 0,
  dislikes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_movie (pelicula_id, usuario_id),
  FOREIGN KEY (pelicula_id) REFERENCES peliculas(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- 6. REACCIONES (Likes / Dislikes en reseñas)
CREATE TABLE reacciones (
  usuario_id INT NOT NULL,
  resena_id INT NOT NULL,
  tipo ENUM('like', 'dislike') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (usuario_id, resena_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (resena_id) REFERENCES resenas(id) ON DELETE CASCADE
);

-- 7. FAVORITOS / WATCHLIST 
CREATE TABLE favoritos (
  usuario_id INT NOT NULL,
  pelicula_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (usuario_id, pelicula_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (pelicula_id) REFERENCES peliculas(id) ON DELETE CASCADE
);