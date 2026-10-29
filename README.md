# KarenFlix Backend

API REST de KarenFlix con Node.js, Express y MySQL. El frontend consume HTTP/JSON; nunca accede directamente a MySQL.

## Inicio local (Windows/Linux)

Requiere Node.js 20 LTS+, npm y MySQL 8+. Ejecuta npm ci, copia .env.example a .env y agrega las credenciales MySQL que usas en Workbench (host, puerto, usuario y contraseña del servidor MySQL). No asumas que la contraseña de Linux/SSH también es la contraseña MySQL. Ejecuta database/schema.sql en Workbench para una base nueva. En una base existente, respalda y sigue database/migrations/README.md. Ejecuta npm run dev. El servidor verifica MySQL antes de escuchar.

En Linux: cp .env.example .env; edita .env con los datos de MySQL; npm ci; npm run dev. Nunca subas .env.

Verifica /health, /api/v1/version y /api-docs en localhost:3000.

## Arquitectura y seguridad

Flujo: routes → middlewares → controllers → services → models/repositorios → MySQL. Pool mysql2 compartido, consultas parametrizadas, orden dinámico con allowlist, DTOs de salida y fábrica DTO. Errores centralizados y transacciones.

Helmet, CORS de lista permitida, rate limit global y más estricto en auth, límite JSON, validación, bcrypt 12 rondas, JWT con issuer/audience y cookie HttpOnly. En producción cookie Secure y SameSite=None; las operaciones con cookie validan Origin. El token Bearer sigue temporalmente disponible para integrar clientes existentes. Fetch con cookie requiere credentials: 'include'.

En producción configura JWT_SECRET aleatorio de al menos 32 caracteres (en Linux puedes generarlo con openssl rand -base64 48), DB_SSL=true/CA del proveedor, CORS_ORIGIN exacto y TRUST_PROXY=true solo detrás de proxy confiable. Usa usuario MySQL de permisos mínimos; nunca root desde la API.

## Rutas principales

Auth: POST /api/v1/auth/register, POST /login, POST /logout, GET /me.
Categorías: GET público; escritura admin.
Catálogo: GET /api/v1/peliculas?page=1&limit=20&orden=ranking, GET /:id, POST propone pendiente; PUT/DELETE admin.
Reseñas: GET/POST /peliculas/:id/resenas, PUT/DELETE /resenas/:id. Reacciones: POST/DELETE /resenas/:id/reaccion.
Ranking: GET /api/v1/ranking?limit=10.
Swagger: /api-docs. Respuestas: {status,data} o {status,error:{code,message}}.

## Pruebas de API

Abre `bruno/KarenFlix API` en Bruno y selecciona `Local`. Si usas Postman, importa `bruno/KarenFlix API/export/KarenFlix-CRUD.postman_collection.json`. Los archivos de `data` contienen los cuerpos y casos de prueba. Para las operaciones administrativas, coloca el JWT de una cuenta administradora en el entorno local.

## Primer administrador

Registra usuario normal y promuévelo manualmente en Workbench: UPDATE usuarios SET rol='admin' WHERE email='correo-registrado'. No existe clave ni endpoint público para elevar privilegios.

Frontend: https://github.com/WilKtu/karenflix-frontend. Historias revisadas en docs/HISTORIAS_USUARIO_CORREGIDAS.md. Cada sección debe tener rama feature/hu-XX, commits pequeños y PR revisado hacia develop.
Excel de normalización: docs/normalizacion_karenflix.xlsx. Diagramas ER, capas y transacción: docs/diagramas/.
Contrato para Wilder en docs/CONTRATO_API_FRONTEND.md; completar la plantilla compartida en docs/INTEGRACION_WILDER.md durante la prueba entre repos.
