USE karenflix;
INSERT IGNORE INTO categorias(nombre,descripcion) VALUES
('Ciencia ficción','Historias de ciencia, futuro y exploración espacial'),
('Acción','Aventuras y acción'),
('Anime','Animación japonesa'),
('Fantasía','Mundos fantásticos'),
('Drama','Historias dramáticas'),
('Comedia','Historias de comedia');
-- Crea el primer usuario con POST /api/v1/auth/register y promuévelo manualmente a admin:
-- UPDATE usuarios SET rol='admin' WHERE email='tu-correo-verificado@example.com';
