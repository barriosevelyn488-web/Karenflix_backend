-- =====================================================
-- SEEDERS INICIALES PARA KARENFLIX
-- =====================================================

-- 1. Insertar usuario Administrador por defecto (Contraseña: password123)
INSERT IGNORE INTO usuarios (id, nombre, email, password_hash, rol) 
VALUES (1, 'Admin Karenflix', 'admin@karenflix.com', '$2b$10$39W8s2mJvE4z8JqX2VjY1.1Y8k3Zz5X5e5X5e5X5e5X5e5X5e5X5e', 'admin');

-- 2. Insertar categorías base
INSERT IGNORE INTO categorias (id, nombre, descripcion) VALUES 
(1, 'Ciencia Ficción', 'Películas de exploración espacial, futuros distópicos y tecnología.'),
(2, 'Acción', 'Películas cargadas de adrenalina, combates y persecuciones.'),
(3, 'Anime', 'Animación japonesa de diversos géneros.');

-- 3. Insertar película de prueba aprobada
INSERT IGNORE INTO peliculas (id, titulo, titulo_normalizado, descripcion, tipo, anio, categoria_id, estado, creado_por, rating_promedio, total_resenas) 
VALUES (1, 'Interestelar', 'interestelar', 'Una odisea espacial a través de agujeros de gusano para salvar a la humanidad.', 'pelicula', 2014, 1, 'aprobada', 1, 10.00, 1);

-- 4. Insertar reseña inicial para la película (ID 1)
INSERT IGNORE INTO resenas (id, pelicula_id, usuario_id, titulo, comentario, calificacion) 
VALUES (1, 1, 1, 'Obra maestra', 'Una película increíble con efectos visuales y una banda sonora de otro planeta.', 10);
