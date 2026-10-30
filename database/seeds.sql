USE karenflix;

INSERT IGNORE INTO categorias(id, nombre, descripcion) VALUES
(1, 'Ciencia ficción', 'Viajes espaciales, futuros distópicos y tecnología avanzada'),
(2, 'Acción', 'Adrenalina pura, persecuciones y secuencias de alto impacto'),
(3, 'Drama', 'Historias humanas profundas con actuaciones memorables'),
(4, 'Anime', 'Animación japonesa de culto, fantasía épica y cyberpunk'),
(5, 'Fantasía', 'Mundos mágicos y universos extraordinarios'),
(6, 'Comedia', 'Historias de humor e ingenio');

INSERT IGNORE INTO directores(id, nombre) VALUES
(1, 'Christopher Nolan'),
(2, 'Denis Villeneuve'),
(3, 'Hiroyuki Imaishi'),
(4, 'Chad Stahelski');

INSERT IGNORE INTO actores(id, nombre) VALUES
(1, 'Matthew McConaughey'),
(2, 'Anne Hathaway'),
(3, 'Leonardo DiCaprio'),
(4, 'Timothée Chalamet'),
(5, 'Zendaya'),
(6, 'Cillian Murphy'),
(7, 'Keanu Reeves');

INSERT IGNORE INTO peliculas
(id, titulo, titulo_normalizado, descripcion, duracion_minutos, tipo, anio, categoria_id, director_id, imagen_url, trailer_url, estado, rating_promedio, total_resenas)
VALUES
(1, 'Interstellar: Odisea Cósmica', 'interstellar: odisea cosmica', 'Un grupo de exploradores espaciales atraviesa un agujero de gusano cerca de Saturno en busca de un nuevo planeta habitable para salvar a la humanidad.', 169, 'pelicula', 2014, 1, 1, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80', 'https://www.youtube.com/watch?v=zSWdZVtXT7E', 'aprobada', 9.40, 2),
(2, 'Inception: El Origen', 'inception: el origen', 'Dom Cobb es un ladrón hábil en el arte de la extracción: robar secretos valiosos desde lo más profundo del subconsciente durante el estado de sueño.', 148, 'pelicula', 2010, 1, 1, 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80', 'https://www.youtube.com/watch?v=YoHD9XEInc0', 'aprobada', 9.20, 1),
(3, 'Dune: Parte Dos', 'dune: parte dos', 'Paul Atreides se une a Chani y a los Fremen mientras emprende una guerra de venganza contra los conspiradores que destruyeron a su familia.', 166, 'pelicula', 2024, 1, 2, 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80', 'https://www.youtube.com/watch?v=Way9Dexny3w', 'aprobada', 9.00, 1),
(4, 'Cyberpunk: Edgerunners', 'cyberpunk: edgerunners', 'Un chico de la calle intenta sobrevivir en una ciudad del futuro obsesionada con la tecnología y las modificaciones corporales cibernéticas.', 240, 'anime', 2022, 4, 3, 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80', 'https://www.youtube.com/watch?v=JtqIas3bYhg', 'aprobada', 8.90, 1),
(5, 'Oppenheimer', 'oppenheimer', 'La historia del físico estadounidense J. Robert Oppenheimer y su papel crucial al frente del Proyecto Manhattan en el desarrollo de la bomba atómica.', 180, 'pelicula', 2023, 3, 1, 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80', 'https://www.youtube.com/watch?v=uYPbbksJxIg', 'aprobada', 8.80, 1),
(6, 'John Wick 4: Baba Yaga', 'john wick 4: baba yaga', 'John Wick descubre un camino para derrotar a la Alta Mesa, pero antes de ganar su libertad debe enfrentarse a un nuevo enemigo con alianzas globales.', 169, 'pelicula', 2023, 2, 4, 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80', 'https://www.youtube.com/watch?v=qEVUtrk8_B4', 'aprobada', 8.50, 1),
(7, 'Blade Runner 2049', 'blade runner 2049', 'El descubrimiento de un secreto enterrado durante mucho tiempo lleva a un joven Blade Runner a buscar al antiguo agente Rick Deckard.', 164, 'pelicula', 2017, 1, 2, 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80', 'https://www.youtube.com/watch?v=gCcx85zbxz4', 'pendiente', 0.00, 0);

INSERT IGNORE INTO pelicula_actor(pelicula_id, actor_id) VALUES
(1, 1), (1, 2),
(2, 3),
(3, 4), (3, 5),
(5, 6),
(6, 7);

-- Crea el primer usuario con POST /api/v1/auth/register y promuévelo a admin:
-- UPDATE usuarios SET rol='admin' WHERE email='admin@karenflix.com';
