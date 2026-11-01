# KarenFlix Backend · API RESTful

[![App en Vivo](https://img.shields.io/badge/Vercel-App_en_Vivo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://karenflix-frontend.vercel.app)
[![API Swagger Docs](https://img.shields.io/badge/Swagger-Documentación_API-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://karenflix-backend.vercel.app/api-docs)
[![Video Demostrativo](https://img.shields.io/badge/Google_Drive-Video_Demostrativo_HD-4285F4?style=for-the-badge&logo=googledrive&logoColor=white)](https://drive.google.com/drive/folders/1HSiNq5PU6jD3jWmLozYrz2bn8PvheCkM?usp=sharing)
[![GitHub Projects](https://img.shields.io/badge/SCRUM-GitHub_Projects_Kanban-1F883D?style=for-the-badge&logo=github&logoColor=white)](https://github.com/users/barriosevelyn488-web/projects/1)
[![Repositorio Frontend](https://img.shields.io/badge/Frontend-Repositorio_Oficial-E50914?style=for-the-badge&logo=github&logoColor=white)](https://github.com/WilKtu/karenflix-frontend)
[![Documentación SCRUM](https://img.shields.io/badge/SCRUM-Documento_Oficial_PDF-007A78?style=for-the-badge&logo=adobe-acrobat-reader&logoColor=white)](docs/KarenFlix_Documento_SCRUM_Oficial.pdf)

> **Aplicación en Producción (Frontend):** [https://karenflix-frontend.vercel.app](https://karenflix-frontend.vercel.app)  
> **API REST y Swagger UI (Backend):** [https://karenflix-backend.vercel.app/api-docs](https://karenflix-backend.vercel.app/api-docs)  
> **Video Demostrativo Oficial (Google Drive):** [https://drive.google.com/drive/folders/1HSiNq5PU6jD3jWmLozYrz2bn8PvheCkM?usp=sharing](https://drive.google.com/drive/folders/1HSiNq5PU6jD3jWmLozYrz2bn8PvheCkM?usp=sharing)  
> **Tablero de Seguimiento SCRUM (GitHub Projects):** [https://github.com/users/barriosevelyn488-web/projects/1](https://github.com/users/barriosevelyn488-web/projects/1)  
> **Repositorio Oficial del Frontend:** [https://github.com/WilKtu/karenflix-frontend](https://github.com/WilKtu/karenflix-frontend)  
> **Proyecto Full-Stack:** KarenFlix (Plataforma de Catálogo, Reseñas y Moderación de Películas)  
> **Equipo de Desarrollo:** Evelyn Barrios (Scrum Master) & Wilder Katu (Product Owner)  
> **Docentes Evaluadores:** Eduin Salas & Andre Lopez · Campuslands 2026

---

Para KarenFlix se desarrolló una API con Node.js, Express y MySQL (Aiven Cloud). El frontend se conectó mediante HTTP y recibió respuestas JSON; las credenciales de MySQL permanecieron en el servidor.

## Implementación

El código quedó organizado en `src/`. Las rutas reciben las solicitudes y aplican los middlewares; los controladores traducen HTTP a operaciones de la aplicación, los servicios contienen las reglas de negocio y los modelos ejecutan consultas parametrizadas con el pool de `mysql2`. Los DTO limitaron los datos de entrada y salida, y la fábrica de DTO seleccionó el tipo correspondiente. Las operaciones que modificaron varios registros se ejecutaron en transacciones.

En `src/middlewares/` se incorporaron validación, autenticación, control de roles, límites de peticiones, protección del origen y manejo de errores. También se configuraron Helmet, CORS y límites al tamaño de las solicitudes. Las contraseñas se almacenaron con bcrypt. El inicio de sesión emitió un JWT y una cookie `HttpOnly`; en producción, la cookie quedó configurada con `Secure` y `SameSite=None`. Para facilitar la integración inicial, la API también aceptó `Authorization: Bearer`.

El esquema MySQL se dejó en `database/schema.sql`. La migración `database/migrations/001_actores_trailer.sql` agregó el reparto y el tráiler para bases creadas con el esquema del Sprint 2. Los criterios de uso quedaron documentados en `database/migrations/README.md`.

## Ejecución local

La aplicación se ejecutó con Node.js 20 o superior, npm y MySQL 8. La configuración se tomó de `.env`; el archivo `.env.example` se dejó como plantilla sin credenciales.

```bash
npm ci
cp .env.example .env
```

En `.env` se agregaron el host, puerto, usuario, contraseña y nombre de la base MySQL usados en Workbench. Para una base nueva se ejecutó `database/schema.sql`; para una base del Sprint 2 se revisó la guía de migraciones antes de modificarla. La API se inició con `npm run dev` y comprobó la conexión antes de escuchar en el puerto `3000`.

La configuración local se verificó en `http://localhost:3000/health`, `http://localhost:3000/api/v1/version` y `http://localhost:3000/api-docs`. En Linux se usaron los mismos comandos. `.env` se mantuvo fuera del control de versiones.

## Conexión con el frontend

El navegador se comunicó con la API en `http://localhost:3000/api/v1` en local o en `https://karenflix-backend.vercel.app/api/v1` en producción. El origen del frontend desplegado en Vercel está habilitado en CORS.

Para conservar la cookie de sesión, las solicitudes del navegador se enviaron con `credentials: 'include'`:

```js
const API_URL = 'https://karenflix-backend.vercel.app/api/v1';

const respuesta = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ email, password })
});

const resultado = await respuesta.json();
```

Después del inicio de sesión, el frontend consultó el catálogo de esta forma:

```js
const respuestaCatalogo = await fetch(`${API_URL}/peliculas?page=1&limit=20`, {
  credentials: 'include'
});

const catalogo = await respuestaCatalogo.json();
```

La API también aceptó un JWT en `Authorization: Bearer <token>` para clientes que ya trabajaban con ese mecanismo. Las rutas, formatos de respuesta y errores se describieron en `docs/CONTRATO_API_FRONTEND.md`.

## Rutas disponibles

| Recurso    | Rutas implementadas                                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| Sesión     | `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `POST /api/v1/auth/logout`, `GET /api/v1/auth/me`                 |
| Categorías | `GET /api/v1/categorias`; creación, edición y eliminación para administradores                                             |
| Películas  | `GET /api/v1/peliculas`, `GET /api/v1/peliculas/:id`, `POST /api/v1/peliculas`; edición y eliminación para administradores |
| Reseñas    | `GET /api/v1/peliculas/:id/resenas`, `POST /api/v1/peliculas/:id/resenas`, `PUT` y `DELETE /api/v1/resenas/:id`            |
| Reacciones | `POST` y `DELETE /api/v1/resenas/:id/reaccion`                                                                             |
| Ranking    | `GET /api/v1/ranking?limit=10`                                                                                             |

El listado de películas aceptó `page`, `limit`, `categoria_id`, `q` y `orden`; el máximo de `limit` fue 50. Swagger quedó disponible en `/api-docs`. Las respuestas exitosas usaron `{status, data}` y los errores `{status, error}`.

## Pruebas

Las solicitudes de Bruno se guardaron en `bruno/KarenFlix API/`. La colección de Postman quedó en `bruno/KarenFlix API/export/KarenFlix-CRUD.postman_collection.json`; los cuerpos y casos de prueba se guardaron en la carpeta `data/` de Bruno. Para las operaciones administrativas se necesitó un JWT de una cuenta con rol `admin`.

El primer administrador se creó al registrar una cuenta normal y cambiar su rol desde Workbench:

```sql
UPDATE usuarios SET rol = 'admin' WHERE email = 'correo-registrado';
```

No se implementó una ruta pública para elevar privilegios.

## Documentación y trabajo por ramas

El frontend del equipo se mantuvo en [su repositorio](https://github.com/WilKtu/karenflix-frontend). El contrato se documentó en `docs/CONTRATO_API_FRONTEND.md` y se dejó `docs/INTEGRACION_WILDER.md` para anotar la prueba conjunta.

Las historias corregidas quedaron en `docs/HISTORIAS_USUARIO_CORREGIDAS.md`; la normalización de datos, en `docs/normalizacion_karenflix.xlsx`; y los diagramas, en `docs/diagramas/`. Los cambios se separaron por ramas de historia. La secuencia de integración quedó: HU-22 hacia `develop`, HU-23 hacia HU-22, HU-11 a HU-13 hacia HU-23 y HU-19 hacia la rama de reseñas.

El mapa completo quedó en [`docs/diagramas/arquitectura-completa.svg`](docs/diagramas/arquitectura-completa.svg). Para explicar el diseño paso a paso, se preparó la [guía de diagramas por partes](docs/diagramas/arquitectura.md), con imágenes separadas para el repositorio, el recorrido de solicitudes, la sesión, MySQL y la conexión por entorno.
