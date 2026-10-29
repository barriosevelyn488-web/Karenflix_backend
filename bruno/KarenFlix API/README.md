# Pruebas de la API KarenFlix

Abre esta carpeta en Bruno y selecciona el entorno `Local`. Primero levanta la API y confirma que MySQL esté conectado. Inicia sesión con tus cuentas de prueba y copia sus JWT en `token` y `adminToken` antes de ejecutar las peticiones protegidas.

Las peticiones están numeradas para que puedas seguir el flujo. Al crear una categoría, película o reseña, Bruno guarda su ID en el entorno. Usa ese mismo ID en las peticiones de edición y eliminación.

Si vas a usar Postman, importa `export/KarenFlix-CRUD.postman_collection.json`. Los cuerpos de las peticiones están en `data/`; `data/casos-crud.json` tiene la lista de operaciones y el código HTTP que debería devolver cada una. Cambia los nombres de prueba si ya existen en tu base.

Para revisar los permisos, registra dos cuentas. Cambia el rol de una a `admin` en Workbench siguiendo el README principal y coloca su JWT en `adminToken`. El JWT de la otra cuenta va en `otherToken`; úsalo para comprobar que no pueda modificar reseñas ajenas.

Si una categoría está asignada a una película o una película tiene reseñas, la base no permitirá borrarla y la API responderá `409`. Elimina primero los registros relacionados o usa otros datos de prueba.
