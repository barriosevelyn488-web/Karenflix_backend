# Migraciones de la base de datos

Antes de cambiar una base que ya tiene datos, guarda un respaldo.

Si todavía no existe la base de KarenFlix, ejecuta `database/schema.sql` en Workbench. Ese esquema ya incluye los cambios de la migración `001_actores_trailer.sql`, así que no hace falta correrla aparte.

Para actualizar una base del Sprint 2, revisa en `information_schema` las tablas y columnas de películas y actores. La migración `001_actores_trailer.sql` es para esa versión: amplía las columnas de imagen y calificación, agrega `trailer_url` y crea las tablas de actores y reparto. Ejecútala una sola vez y confirma que terminó sin errores antes de conectar la API.

El archivo no elimina la base de datos. Si tu esquema del Sprint 2 tiene cambios distintos a los esperados, no ejecutes la migración a ciegas; compara primero las columnas con el archivo SQL.
