# Migraciones de la base de datos

Antes de modificar una base de datos existente, realice una copia de seguridad y verifique que pueda restaurarla.

Para crear la base de datos desde cero, ejecute `database/schema.sql` en MySQL Workbench. Este esquema ya contiene los cambios de `001_actores_trailer.sql`; por tanto, no aplique esa migración por separado.

Para actualizar la base del Sprint 2, compruebe en `information_schema` que las tablas y columnas requeridas por la migración aún no existan. El archivo `001_actores_trailer.sql` amplía las columnas de imagen y calificación, agrega `trailer_url` y crea las tablas `actores` y `pelicula_actor`. Aplíquelo una sola vez sobre una base compatible y confirme que finalizó correctamente antes de iniciar la API.

La migración no elimina la base de datos. Si el esquema del Sprint 2 difiere de la estructura prevista, no la aplique hasta comparar las tablas y columnas existentes con las instrucciones del archivo SQL.
