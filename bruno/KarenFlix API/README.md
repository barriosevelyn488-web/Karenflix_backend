# Pruebas de la API KarenFlix

Las pruebas usan el entorno `Local` de Bruno y requieren que la API esté conectada a MySQL. Inicia sesión con las cuentas de prueba y guarda sus JWT en `token` y `adminToken`; varias peticiones necesitan esos valores para ejecutarse.

Las peticiones numeradas siguen el flujo de uso. Bruno guarda en el entorno el ID de cada categoría, película o reseña que se crea y lo usa después para editarla o eliminarla.

Si vas a usar Postman, importa `export/KarenFlix-CRUD.postman_collection.json`. Los cuerpos de las peticiones están en `data/`; `data/casos-crud.json` tiene la lista de operaciones y el código HTTP que debería devolver cada una. Cambia los nombres de prueba si ya existen en tu base.

Para revisar los permisos, registra dos cuentas. Cambia el rol de una a `admin` en Workbench siguiendo el README principal y coloca su JWT en `adminToken`. El JWT de la otra cuenta va en `otherToken`; úsalo para comprobar que no pueda modificar reseñas ajenas.

Si una categoría está asignada a una película o una película tiene reseñas, la base no permitirá borrarla y la API responderá `409`. Elimina primero los registros relacionados o usa otros datos de prueba.
