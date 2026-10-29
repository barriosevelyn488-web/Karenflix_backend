# Migraciones de la base de datos

La migración `001_actores_trailer.sql` se preparó para actualizar la base de datos del Sprint 2. Amplió las columnas de imagen y calificación de `peliculas`, agregó `trailer_url` y creó las tablas `actores` y `pelicula_actor`.

Para una instalación nueva se utilizó `database/schema.sql`, que ya incluyó esos cambios. En ese caso, la migración no se ejecutó por separado.

## Uso en MySQL Workbench

Antes de actualizar una base existente, se debía crear y verificar una copia de seguridad. También se comprobaban las tablas y columnas en `information_schema` para confirmar que la base correspondía al esquema del Sprint 2 y que los cambios aún no se habían aplicado. En MySQL Workbench, se abrió `001_actores_trailer.sql` y se ejecutó una sola vez sobre la conexión a `karenflix`.

Al terminar, se verificaban `trailer_url`, `actores` y `pelicula_actor` antes de iniciar la API. Si parte de esos cambios ya existía o el esquema difería del esperado, primero se comparaban las definiciones con el archivo; no se volvía a ejecutar sin adaptar la migración.

El script no eliminó la base de datos ni sus registros.
