# Pruebas de la API KarenFlix

Para revisar la API se prepararon solicitudes de Bruno y una colección exportada para Postman. La carpeta `export/` contiene las operaciones CRUD de categorías, películas y reseñas. En `data/` quedaron los cuerpos JSON y `casos-crud.json` registró las rutas y respuestas esperadas.

La colección de Bruno se conectó a `http://localhost:3000` mediante la variable `baseUrl` del entorno `Local`. La API se inició con `npm run dev` después de completar `.env` y establecer la conexión con MySQL.

El registro y el inicio de sesión guardaron el JWT en `token`. Las operaciones administrativas requirieron que se agregara el JWT de una cuenta con rol `admin` a `adminToken`. Para comprobar permisos entre cuentas también se dejó `otherToken` en el entorno. El primer administrador se preparó desde Workbench, como se describió en el README principal.

Las peticiones de creación guardaron sus IDs en el entorno para utilizarlos luego en consultas, ediciones y eliminaciones. La colección se ejecutó con datos de prueba; si alguno ya existía en la base, se cambió el nombre o el correo antes de repetir el flujo. Las eliminaciones de categorías o películas con registros relacionados respondieron `409` y requirieron conservar esos datos o retirarlos primero.
