# Migraciones

Respalda la base antes de modificarla. Base nueva: ejecutar database/schema.sql; no correr migraciones incluidas ya en ese esquema.

Para base Sprint 2 existente, inspecciona information_schema.tables y information_schema.columns. Si faltan trailer_url, actores o pelicula_actor (y aún conserva imagen_url de 255 caracteres/rating_promedio DECIMAL(3,2)), ejecuta 001_actores_trailer.sql una sola vez. Registra la migración aplicada en el control de cambios del equipo. El schema no borra bases ni usa DROP DATABASE.
