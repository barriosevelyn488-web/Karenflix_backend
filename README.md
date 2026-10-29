# KarenFlix Backend

Backend de la aplicación KarenFlix. Está hecho con Node.js, Express y MySQL. El sitio web se comunica con la API por HTTP y recibe respuestas JSON; la conexión a MySQL se queda en el servidor.

## Ejecutar en local

Necesitas Node.js 20 o superior, npm y MySQL 8. Instala las dependencias y prepara la configuración local:

```bash
npm ci
cp .env.example .env
```

Completa `.env` con los datos de conexión de MySQL que usas en Workbench. La contraseña de Linux no tiene por qué ser la misma que la de MySQL. Para una base nueva, ejecuta `database/schema.sql` en Workbench. Si vas a usar una base del Sprint 2, revisa primero las instrucciones de `database/migrations/README.md`.

Arranca la API con `npm run dev`. El servidor comprueba la conexión a MySQL antes de empezar a escuchar en el puerto 3000. Puedes revisar `/health`, `/api/v1/version` y `/api-docs` en `http://localhost:3000`.

En Linux, los comandos son los mismos. Crea `.env` a partir de `.env.example`, agrega la configuración de MySQL y ejecuta `npm ci` y `npm run dev`. Ese archivo contiene credenciales y no se debe subir a GitHub.

## Organización del código

Las rutas pasan por los middlewares y controladores. Los servicios manejan las reglas de la aplicación y los modelos ejecutan consultas parametrizadas con el pool compartido de `mysql2`. Los DTO limitan los datos que entran y salen. Las operaciones que modifican varios registros usan transacciones.

La API también configura Helmet, CORS con orígenes permitidos, límites de peticiones, validación y manejo centralizado de errores. Las contraseñas se guardan con bcrypt. El inicio de sesión entrega un JWT y una cookie `HttpOnly`; en producción la cookie lleva `Secure` y `SameSite=None`. Las peticiones autenticadas con cookie validan el origen. Mientras se conecta el frontend también se acepta `Authorization: Bearer`.

Para producción, usa un `JWT_SECRET` aleatorio de al menos 32 caracteres. En Linux puedes generarlo con `openssl rand -base64 48`. Configura `DB_SSL` y el certificado CA que entregue el proveedor de MySQL. Limita `CORS_ORIGIN` al dominio del frontend y activa `TRUST_PROXY` solo cuando la API esté detrás de un proxy confiable. La API debe conectarse con un usuario MySQL de permisos limitados, no con `root`.

## Rutas principales

| Recurso    | Rutas                                                                                                                      |
| ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| Sesión     | `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `POST /api/v1/auth/logout`, `GET /api/v1/auth/me`                 |
| Categorías | `GET /api/v1/categorias`; escritura para administradores                                                                   |
| Películas  | `GET /api/v1/peliculas`, `GET /api/v1/peliculas/:id`, `POST /api/v1/peliculas`; edición y eliminación para administradores |
| Reseñas    | `GET /api/v1/peliculas/:id/resenas`, `POST /api/v1/peliculas/:id/resenas`, `PUT` y `DELETE /api/v1/resenas/:id`            |
| Reacciones | `POST` y `DELETE /api/v1/resenas/:id/reaccion`                                                                             |
| Ranking    | `GET /api/v1/ranking?limit=10`                                                                                             |

La lista de películas acepta `page`, `limit`, `categoria_id`, `q` y `orden`. El límite máximo es 50. Swagger está disponible en `/api-docs`. Las respuestas exitosas usan `{status, data}`; los errores incluyen `{status, error}`.

## Pruebas con Bruno y Postman

La colección de Bruno está en `bruno/KarenFlix API`. Para Postman, importa `bruno/KarenFlix API/export/KarenFlix-CRUD.postman_collection.json`. Los ejemplos y los casos están en la carpeta `data` de la colección. Las operaciones administrativas necesitan el JWT de una cuenta con rol `admin`.

## Crear el primer administrador

Registra una cuenta normal y, desde Workbench, cambia su rol:

```sql
UPDATE usuarios SET rol = 'admin' WHERE email = 'correo-registrado';
```

No hay una ruta pública para asignar el rol de administrador.

## Trabajo del equipo

El frontend está en [el repositorio de KarenFlix](https://github.com/WilKtu/karenflix-frontend); su integración se debe revisar con Wilder. El contrato de la API está en `docs/CONTRATO_API_FRONTEND.md` y la revisión conjunta se puede anotar en `docs/INTEGRACION_WILDER.md`.

Las historias revisadas están en `docs/HISTORIAS_USUARIO_CORREGIDAS.md`. Mantén los cambios en ramas por historia y abre los PR según sus dependencias: HU-22 hacia `develop`, HU-23 hacia HU-22, HU-11 a HU-13 hacia HU-23 y HU-19 hacia la rama de reseñas.

El Excel de normalización está en `docs/normalizacion_karenflix.xlsx`. Los diagramas del modelo, la arquitectura y el flujo de reseñas están en `docs/diagramas/`.
