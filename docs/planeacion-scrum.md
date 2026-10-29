# DOCUMENTO DE GESTIÓN ÁGIL · METODOLOGÍA SCRUM

## KarenFlix — Reseñas y ranking de películas, series y anime

**Roles · Sprints · Historias de usuario · Seguimiento · Evidencias**

* **Estudiantes:** Evelyn Barrios (Persona 1 · Scrum Master) · Wilder Katu (Persona 2 · Product Owner)
* **Docentes / Evaluadores:** Eduin Salas · Andre Lopez
* **Institución / Programa:** Campuslands · Desarrollo Web Full-Stack / Node.js & Express
* **Periodo de ejecución:** 26/10/2026 – 30/10/2026

---

## Contenido

Este documento formaliza la gestión integral del proyecto **KarenFlix** bajo el marco de trabajo SCRUM. Corresponde a una aplicación full-stack desacoplada: backend en Node.js + Express con persistencia relacional en MySQL (driver `mysql2/promise` con transacciones ACID), y frontend modular desarrollado en HTML, CSS y JavaScript moderno sin frameworks. El desarrollo se distribuyó en dos sprints de trabajo en pareja vertical con revisión cruzada de código.

* **01 Roles asignados:** Distribución de responsabilidades y ceremonias.
* **02 Definición de sprints:** Duración, capacidad, objetivos y Definición de Hecho (DoD).
* **03 Historias de usuario:** Épicas, backlog priorizado y 21 fichas técnicas con criterios de aceptación.
* **04 Herramienta de seguimiento:** Configuración de GitHub Projects y flujo Kanban de 5 columnas.
* **05 Evidencias:** Trazabilidad, enlaces a repositorios y actas de retrospectiva.

---

## 01 Roles asignados

El equipo de desarrollo se organiza en pareja vertical: cada integrante asume un rol directivo en la metodología SCRUM y participa activamente en la implementación técnica de sus módulos asignados (backend y frontend), garantizando que ambos miembros dominen el 100% de la arquitectura.

### Matriz de Roles

| Rol | Responsable | Sprints en los que actúa | Responsabilidades y Módulos |
| :--- | :--- | :---: | :--- |
| **Product Owner** | Wilder Katu | Sprint 1 y 2 | Define y prioriza el Product Backlog, redacta las Historias de Usuario con sus criterios de aceptación y valida los entregables funcionales. Desarrolla los módulos de reseñas, reacciones (likes/dislikes), ranking ponderado bayesiano y las pantallas principales del frontend. |
| **Scrum Master** | Evelyn Barrios | Sprint 1 y 2 | Facilita las ceremonias ágiles (Planning, Daily, Review, Retrospectiva), remueve impedimentos técnicos y vela por el cumplimiento del proceso y la calidad del código. Desarrolla la arquitectura base, autenticación (JWT + cookies), seguridad (rate limiting, CORS, roles), catálogo normalizado (actores, directores, trailers) y el panel web de administración. |
| **Equipo de Desarrollo** | Evelyn Barrios y Wilder Katu | Sprint 1 y 2 | Estiman y ejecutan las subtareas técnicas, garantizan transacciones atómicas y entregan incrementos funcionales con pruebas en Bruno y documentación en Swagger. |
| **Revisores / Trainers** | Eduin Salas y Andre Lopez | Sprint 1 y 2 | Evaluadores académicos asignados como colaboradores en los repositorios privados de GitHub. |

### Dinámica de Trabajo en Pareja ("Explícame tu PR")
Al cierre de cada jornada, se realiza una sesión de 15 minutos donde el autor del Pull Request explica línea por línea la solución implementada a su compañero(a). Esto asegura que ambos integrantes estén preparados para la sustentación individual de dominio de código ante los docentes.

---

## 02 Definición de Sprints

### Parámetros Generales

* **Duración por Sprint:** 2 a 3 días hábiles.
* **Número de Sprints:** 2 sprints consecutivos.
* **Capacidad estimada:** 32 a 48 horas de desarrollo colaborativo por sprint.
* **Fecha de inicio:** 26/10/2026.
* **Fecha de finalización y entrega:** 30/10/2026.

### Plan de Sprints

| Sprint | Objetivo Estratégico | Periodo | Puntos | Estado |
| :---: | :--- | :---: | :---: | :---: |
| **Sprint 1** | Cimentación de arquitectura limpia por capas, conexión a MySQL con pool Singleton, autenticación híbrida con JWT y cookies HttpOnly, control de roles, catálogo base de categorías y películas, dataset realista (`seeds.sql`) y maquetación inicial del frontend. | 26/10 – 27/10 | 37 pts | **Realizado** |
| **Sprint 2** | Gestión de reseñas con transacciones ACID, votos de like/dislike atómicos, algoritmo de ranking bayesiano ponderado, filtros y paginación, panel web de administración, subida/gestión de pósters, documentación en Swagger UI, suite de pruebas en Bruno, despliegue en Vercel y cierre de evidencias. | 28/10 – 30/10 | 46 pts | **En proceso** |

### Ceremonias Ágiles Implementadas

1. **Sprint Planning (Día 1 y Día 3 · 1 hora):** Selección y desglose de las historias de usuario de cada sprint, estimación en puntos de historia (Planning Poker) y asignación de responsables.
2. **Daily Scrum (Diario · 15 minutos):** Inspección de avance diario respondiendo: *¿Qué completé ayer? ¿Qué programaré hoy? ¿Qué impedimentos técnicos bloquean mi avance?*
3. **Sprint Review (Cierre de cada sprint · Días 2 y 5):** Demostración funcional en vivo de los endpoints probados en Bruno y de la interfaz gráfica.
4. **Sprint Retrospective (Inmediatamente posterior a la Review):** Análisis de aciertos técnicos, áreas de oportunidad y acuerdos de mejora continua.

### Definición de Hecho (Definition of Done - DoD)
Una Historia de Usuario se considera formalmente **Hecha (Realizada)** cuando:
1. El código reside en su propia rama `feature/hu-XX-...` y cuenta con Pull Request aprobado y mergeado hacia `develop`.
2. Todos los criterios de aceptación fueron verificados con casos de éxito y de borde en Bruno.
3. El endpoint está completamente tipado y documentado en Swagger UI (`/api-docs`).
4. Las respuestas de error devuelven el código de estado HTTP adecuado (400, 401, 403, 404, 409, 500) con mensajes claros para el usuario final.
5. El código pasa el formateador Prettier y no contiene credenciales expuestas en el repositorio.
6. La tarjeta correspondiente en el tablero de GitHub Projects se encuentra en la columna **Realizado**.

---

## 03 Historias de Usuario

### Épicas del Producto

| ID | Épica / Módulo Funcional | Historias Incluidas | Puntos | Sprint | Responsable |
| :---: | :--- | :---: | :---: | :---: | :---: |
| **EP-01** | Arquitectura y Configuración — Node.js, Express, MySQL 3FN, capas, SOLID y SemVer | HU-01, HU-02 | 8 | Sprint 1 | Evelyn Barrios |
| **EP-02** | Usuarios y Seguridad — Registro, login JWT, Passport.js, Cookies HttpOnly, roles y rate limiting | HU-03, HU-04, HU-05 | 11 | Sprint 1 | Evelyn Barrios |
| **EP-03** | Catálogo Multimedia — Categorías, películas, directores, actores, trailers y aprobación | HU-06, HU-07, HU-08, HU-17 | 14 | Sprints 1 y 2 | Evelyn Barrios |
| **EP-04** | Reseñas y Reacciones — CRUD de reseñas con transacciones ACID y likes/dislikes sin auto-voto | HU-11, HU-12 | 13 | Sprint 2 | Wilder Katu |
| **EP-05** | Rankings y Listados — Score bayesiano ponderado, filtros dinámicos, orden y paginación | HU-13, HU-14 | 10 | Sprint 2 | Wilder Katu |
| **EP-06** | Frontend y Experiencia de Usuario — Base visual, catálogo interactivo, detalle y panel admin | HU-09, HU-15, HU-16 | 13 | Sprints 1 y 2 | Wilder Katu / Evelyn Barrios |
| **EP-07** | Calidad, Datos y Pruebas — Semillas realistas (`seeds.sql`), suite de Bruno y casos borde | HU-10, HU-19 | 5 | Sprints 1 y 2 | Evelyn Barrios / Wilder Katu |
| **EP-08** | Documentación y Despliegue — Swagger UI, diagramas SVG, Vercel, PDF SCRUM y video | HU-18, HU-20, HU-21 | 9 | Sprint 2 | Evelyn Barrios / Wilder Katu |

---

### Backlog Priorizado General (83 Puntos de Historia)

| ID | Historia de Usuario | Prioridad | Puntos | Sprint | Responsable | Estado Actual |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| **HU-01** | Configuración del proyecto y base de datos MySQL | Alta | 5 | Sprint 1 | Evelyn Barrios | **Realizado** |
| **HU-02** | Arquitectura por capas y manejo centralizado de errores | Alta | 3 | Sprint 1 | Evelyn Barrios | **Realizado** |
| **HU-03** | Registro seguro de usuarios con bcrypt | Alta | 3 | Sprint 1 | Evelyn Barrios | **Realizado** |
| **HU-04** | Autenticación JWT y extracción híbrida (Bearer/Cookie) | Alta | 5 | Sprint 1 | Evelyn Barrios | **Realizado** |
| **HU-05** | Control de acceso por roles, CORS y Rate Limiting | Alta | 3 | Sprint 1 | Evelyn Barrios | **Realizado** |
| **HU-06** | Gestión administrativa de categorías | Alta | 3 | Sprint 1 | Evelyn Barrios | **Realizado** |
| **HU-07** | Registro y gestión de películas, trailers y actores (3FN) | Alta | 5 | Sprint 1 | Evelyn Barrios | **Realizado** |
| **HU-08** | Flujo de moderación y aprobación de propuestas | Alta | 3 | Sprint 1 | Evelyn Barrios | **Realizado** |
| **HU-09** | Base visual del frontend y cliente HTTP de la API | Alta | 5 | Sprint 1 | Wilder Katu | **En proceso** |
| **HU-10** | Dataset realista y semillas en SQL (`seeds.sql`) | Media | 2 | Sprint 1 | Wilder Katu | **Realizado** |
| **HU-11** | Gestión de reseñas con transacciones ACID | Alta | 8 | Sprint 2 | Wilder Katu | **Realizado** |
| **HU-12** | Sistema de reacciones (Likes/Dislikes) en reseñas | Alta | 5 | Sprint 2 | Wilder Katu | **Realizado** |
| **HU-13** | Algoritmo de ranking ponderado bayesiano | Alta | 5 | Sprint 2 | Wilder Katu | **Realizado** |
| **HU-14** | Listado de catálogo con filtros, orden y paginación | Alta | 5 | Sprint 2 | Wilder Katu | **En proceso** |
| **HU-15** | Vista de detalle de película con reproductor y comentarios | Alta | 3 | Sprint 2 | Wilder Katu | **En proceso** |
| **HU-16** | Panel de administración web para gestión y moderación | Alta | 5 | Sprint 2 | Evelyn Barrios | **Por hacer** |
| **HU-17** | Subida y gestión de pósters con vista previa | Media | 3 | Sprint 2 | Evelyn Barrios | **Por hacer** |
| **HU-18** | Documentación de la API en Swagger y README técnico | Alta | 3 | Sprint 2 | Wilder Katu | **Realizado** |
| **HU-19** | Suite de pruebas en Bruno y cobertura de casos de borde | Media | 3 | Sprint 2 | Evelyn / Wilder | **Realizado** |
| **HU-20** | Entrega final, informe SCRUM y video explicativo | Alta | 3 | Sprint 2 | Evelyn / Wilder | **Por hacer** |
| **HU-21** | Despliegue en la nube (Vercel + MySQL en la nube) | Alta | 3 | Sprint 2 | Evelyn / Wilder | **Por hacer** |

---

### Fichas Detalladas de Historias de Usuario

#### HU-01 · Configuración del proyecto y base de datos
* **Historia:** Como desarrolladora, quiero configurar Node.js + Express y la conexión a MySQL con variables de entorno, para tener una base técnica segura y preparada para transacciones.
* **Criterios de aceptación:**
  - [x] Proyecto inicializado con módulos ECMAScript y scripts `dev` / `start`.
  - [x] Conexión mediante pool de `mysql2/promise` bajo patrón Singleton.
  - [x] Credenciales protegidas en archivo `.env` con plantilla `.env.example`.
  - [x] Esquema relacional con claves foráneas, restricciones UNIQUE y CHECK.
  - [x] Errores de conexión capturados sin filtrar datos sensibles.
* **Subtareas:**
  - [x] 01.1 Crear el repositorio y definir dependencias obligatorias en `package.json`.
  - [x] 01.2 Crear módulo de configuración `src/config/env.js`.
  - [x] 01.3 Crear pool de conexión en `src/config/db.js` y verificar salud de conexión.
  - [x] 01.4 Diseñar y ejecutar script DDL `database/schema.sql`.
  - [x] 01.5 Configurar servidor Express en `src/app.js` y `src/server.js`.
  - [x] 01.6 Primer commit y apertura de rama `develop`.
* **Metadatos:** Prioridad: Alta | Puntos: 5 | Sprint: 1 | Responsable: Evelyn Barrios | **Estado: Realizado**

---

#### HU-02 · Arquitectura por capas y manejo de errores
* **Historia:** Como desarrolladora, quiero organizar el código en capas aplicando SOLID y patrones de diseño, para mantener el código claro, escalable y fácil de explicar.
* **Criterios de aceptación:**
  - [x] Estructura estricta: `routes`, `middlewares`, `validators`, `controllers`, `services`, `models`, `config`, `dtos`, `utils`.
  - [x] Controladores sin sentencias SQL y modelos sin lógica de negocio.
  - [x] Errores centralizados mediante clase personalizada `AppError` y middleware `errorHandler`.
  - [x] Códigos HTTP canónicos (200, 201, 204, 400, 401, 403, 404, 409, 500).
  - [x] API versionada bajo `/api/v1` y endpoint `/api/v1/version` verificado con `semver`.
* **Subtareas:**
  - [x] 02.1 Crear árbol de directorios desacoplado en `src/`.
  - [x] 02.2 Implementar `src/utils/AppError.js`.
  - [x] 02.3 Crear `src/middlewares/errorHandler.js` y middleware para rutas 404.
  - [x] 02.4 Implementar endpoint de versión semántica con la librería `semver`.
  - [x] 02.5 Configurar scripts de formato con Prettier.
* **Metadatos:** Prioridad: Alta | Puntos: 3 | Sprint: 1 | Responsable: Evelyn Barrios | **Estado: Realizado**

---

#### HU-03 · Registro de usuarios
* **Historia:** Como visitante, quiero crear una cuenta con nombre, email y contraseña, para poder participar y publicar reseñas.
* **Criterios de aceptación:**
  - [x] Email único a nivel de base de datos (responde 409 si ya existe).
  - [x] Contraseña encriptada de forma irreversible con `bcrypt` (10 salt rounds).
  - [x] Validación estricta con `express-validator` (email válido, contraseña >= 8 caracteres).
  - [x] Rol por defecto asignado automáticamente: `usuario`.
  - [x] La respuesta JSON y el DTO nunca retornan el campo de contraseña.
* **Subtareas:**
  - [x] 03.1 Crear modelo `src/models/usuario.model.js` con métodos `crear` y `buscarPorEmail`.
  - [x] 03.2 Implementar lógica de hash en `src/services/auth.service.js`.
  - [x] 03.3 Definir reglas de validación en `src/validators/auth.validator.js`.
  - [x] 03.4 Configurar ruta `POST /api/v1/auth/register` y su controlador.
  - [x] 03.5 Crear prueba funcional en Bruno con caso de éxito y de duplicado.
* **Metadatos:** Prioridad: Alta | Puntos: 3 | Sprint: 1 | Responsable: Evelyn Barrios | **Estado: Realizado**

---

#### HU-04 · Inicio de sesión con JWT y Cookies HttpOnly
* **Historia:** Como usuaria registrada, quiero iniciar sesión y recibir un token seguro, para acceder a las funcionalidades protegidas de la plataforma.
* **Criterios de aceptación:**
  - [x] Login con credenciales válidas (401 genérico ante fallos, sin revelar si falló el email o la clave).
  - [x] Token firmado con `jsonwebtoken` y expiración definida por variables de entorno.
  - [x] Emisión de cookie `HttpOnly`, `SameSite` y `Secure` para evitar ataques de robo por XSS.
  - [x] Estrategia de Passport.js con extracción híbrida: lee cabecera `Bearer` o cookie de sesión.
  - [x] Endpoint `GET /api/v1/auth/me` que devuelve el perfil del usuario autenticado.
* **Subtareas:**
  - [x] 04.1 Implementar verificación `bcrypt.compare` y generación de JWT en `auth.service.js`.
  - [x] 04.2 Configurar estrategia JWT en `src/config/passport.js`.
  - [x] 04.3 Crear middleware `requireAuth` en `src/middlewares/auth.js`.
  - [x] 04.4 Implementar ruta y controlador para `GET /api/v1/auth/me`.
  - [x] 04.5 Probar flujo en Bruno y verificar emisión de cookie y token.
* **Metadatos:** Prioridad: Alta | Puntos: 5 | Sprint: 1 | Responsable: Evelyn Barrios | **Estado: Realizado**

---

#### HU-05 · Roles y protección perimetral
* **Historia:** Como administradora, quiero que solo las cuentas con rol admin ejecuten operaciones de moderación, para proteger la integridad del catálogo.
* **Criterios de aceptación:**
  - [x] Middleware de autorización por roles (403 Forbidden ante accesos denegados).
  - [x] Rate limiting en dos niveles: global (300 req/15min) y estricto en auth (10 intentos/15min).
  - [x] CORS configurado para admitir únicamente orígenes permitidos por lista blanca.
  - [x] Trazabilidad mediante cabecera `X-Request-Id` con UUID autogenerado.
  - [x] Usuario administrador inicial provisto en las semillas.
* **Subtareas:**
  - [x] 05.1 Crear middleware `src/middlewares/roles.js` (`requireAdmin`).
  - [x] 05.2 Proteger rutas de administración con la cadena `requireAuth + requireAdmin`.
  - [x] 05.3 Implementar rate limiters en `src/middlewares/rateLimit.js`.
  - [x] 05.4 Configurar middleware CORS y cabeceras de seguridad Helmet.
  - [x] 05.5 Validar respuestas 401 y 403 con peticiones de prueba.
* **Metadatos:** Prioridad: Alta | Puntos: 3 | Sprint: 1 | Responsable: Evelyn Barrios | **Estado: Realizado**

---

#### HU-06 · Gestión de categorías
* **Historia:** Como administradora, quiero crear, consultar, editar y eliminar categorías, para organizar el catálogo multimedia de KarenFlix.
* **Criterios de aceptación:**
  - [x] Consulta pública (`GET /api/v1/categorias`); creación, edición y borrado restringidos a admin.
  - [x] Unicidad de nombre de categoría (409 ante duplicados).
  - [x] Bloqueo de eliminación si la categoría contiene películas asociadas (409 `RESOURCE_IN_USE`).
  - [x] Validaciones de formato y longitud de nombre y descripción.
* **Subtareas:**
  - [x] 06.1 Implementar `src/models/categoria.model.js`.
  - [x] 06.2 Crear `src/services/categorias.service.js` con validaciones de negocio.
  - [x] 06.3 Crear validadores en `src/validators/categorias.validator.js`.
  - [x] 06.4 Configurar rutas y controlador en `src/routes/categorias.routes.js`.
  - [x] 06.5 Documentar esquemas de categoría en Swagger.
* **Metadatos:** Prioridad: Alta | Puntos: 3 | Sprint: 1 | Responsable: Evelyn Barrios | **Estado: Realizado**

---

#### HU-07 · Registro y gestión de películas, trailers y actores (3FN)
* **Historia:** Como usuaria, quiero proponer películas, series o anime incluyendo trailers y reparto de actores, para enriquecer el catálogo de la plataforma.
* **Criterios de aceptación:**
  - [x] Las propuestas de usuarios ingresan en estado `pendiente`.
  - [x] Título normalizado único en minúsculas y sin dobles espacios (409 ante duplicados).
  - [x] Base de datos normalizada en 3FN con tablas `actores`, `directores` y relación N:M `pelicula_actor`.
  - [x] Soporte para almacenar y validar `trailer_url` (enlaces de video).
  - [x] Operación transaccional con commit y rollback ante inconsistencias.
* **Subtareas:**
  - [x] 07.1 Crear modelo `src/models/pelicula.model.js` con inserción transaccional.
  - [x] 07.2 Implementar utilidad `src/utils/normalizar.js` para limpieza de títulos.
  - [x] 07.3 Resolver persistencia de actores y directores con cláusula `ON DUPLICATE KEY UPDATE`.
  - [x] 07.4 Crear endpoints para `POST /api/v1/peliculas`, `PUT` y `DELETE`.
  - [x] 07.5 Probar creación con actores en Bruno y validar integridad referencial.
* **Metadatos:** Prioridad: Alta | Puntos: 5 | Sprint: 1 | Responsable: Evelyn Barrios | **Estado: Realizado**

---

#### HU-08 · Aprobación y moderación de contenido
* **Historia:** Como administradora, quiero revisar las propuestas de películas pendientes y aprobarlas o rechazarlas, para mantener la calidad del catálogo.
* **Criterios de aceptación:**
  - [x] Endpoint `GET /api/v1/peliculas/admin/pendientes` restringido exclusivamente a administradores.
  - [x] Endpoint `PATCH /api/v1/peliculas/admin/:id/estado` con estados válidos `aprobada` o `rechazada`.
  - [x] Auditoría que almacena el identificador del administrador aprobador (`aprobado_por`).
  - [x] Respuesta 404 si la película no existe.
* **Subtareas:**
  - [x] 08.1 Implementar consulta de pendientes en `pelicula.model.js`.
  - [x] 08.2 Crear método de cambio de estado en `peliculas.service.js`.
  - [x] 08.3 Validar enum de estado con `express-validator`.
  - [x] 08.4 Probar aprobación desde Bruno y verificar que la película aprobada sea visible al público.
* **Metadatos:** Prioridad: Alta | Puntos: 3 | Sprint: 1 | Responsable: Evelyn Barrios | **Estado: Realizado**

---

#### HU-09 · Base visual del frontend y cliente de API
* **Historia:** Como usuaria, quiero una interfaz moderna, responsive y atractiva con navegación clara, para usar la plataforma cómodamente desde cualquier pantalla.
* **Criterios de aceptación:**
  - [x] Repositorio de frontend desacoplado sin librerías pesadas.
  - [x] Paleta temática de streaming oscuro con variables CSS (`css/variables.css`).
  - [ ] Módulo centralizado `js/api.js` configurado hacia `http://localhost:3000/api/v1`.
  - [ ] Componente visual de notificaciones Toast para errores y éxitos.
  - [ ] Navbar dinámico que adapta opciones según si el usuario es visitante o administrador.
* **Subtareas:**
  - [x] 09.1 Crear estructura de directorios en `karenflix-frontend`.
  - [x] 09.2 Maquetar hojas de estilo compartidas (`variables.css`, `base.css`, `componets.css`).
  - [ ] 09.3 Ajustar `config.js` y `api.js` con `USE_MOCK_DATA: false`.
  - [ ] 09.4 Conectar formulario de inicio de sesión y registro.
  - [ ] 09.5 Probar vista responsive en dispositivos móviles y de escritorio.
* **Metadatos:** Prioridad: Alta | Puntos: 5 | Sprint: 1 | Responsable: Wilder Katu | **Estado: En proceso**

---

#### HU-10 · Dataset realista y semillas en SQL
* **Historia:** Como equipo, queremos contar con un conjunto de datos variado y realista, para probar algoritmos de ranking y realizar una demostración completa.
* **Criterios de aceptación:**
  - [x] 6 categorías temáticas y más de 40 títulos reales de cine, anime y series.
  - [x] Usuarios normales y administradores con contraseñas cifradas con bcrypt.
  - [x] Reseñas con calificaciones variadas y fechas distribuidas en el tiempo.
  - [x] Reacciones cruzadas sin auto-likes.
  - [x] Script `database/seeds.sql` ejecutable en MySQL Workbench sin errores.
* **Subtareas:**
  - [x] 10.1 Diseñar catálogo de contenidos y directores.
  - [x] 10.2 Generar hashes válidos de contraseñas.
  - [x] 10.3 Redactar reseñas con opiniones diversas.
  - [x] 10.4 Poblar tabla intermedia de actores y tabla de reacciones.
  - [x] 10.5 Verificar ejecución completa en MySQL.
* **Metadatos:** Prioridad: Media | Puntos: 2 | Sprint: 1 | Responsable: Wilder Katu | **Estado: Realizado**

---

#### HU-11 · Gestión de reseñas con transacciones ACID
* **Historia:** Como usuaria autenticada, quiero publicar, editar y eliminar mis reseñas con título, comentario y nota del 1 al 10, para compartir mi opinión crítica.
* **Criterios de aceptación:**
  - [x] Máximo una reseña por usuario y película (409 ante intentos duplicados).
  - [x] Calificación numérica entera estrictamente entre 1 y 10.
  - [x] Control de propiedad: solo la autora de la reseña puede editarla o eliminarla (403 si no es propia).
  - [x] Recálculo atómico de `rating_promedio` y `total_resenas` de la película dentro de la misma transacción MySQL con `SELECT ... FOR UPDATE`.
  - [x] Ejecución de `ROLLBACK` garantizada si cualquier paso de la transacción falla.
* **Subtareas:**
  - [x] 11.1 Crear modelo `src/models/resena.model.js` con soporte transaccional.
  - [x] 11.2 Implementar servicio transaccional en `src/services/resenas.service.js`.
  - [x] 11.3 Crear validadores de reseña en `src/validators/resenas.validator.js`.
  - [x] 11.4 Montar rutas `POST /api/v1/peliculas/:id/resenas`, `PUT` y `DELETE`.
  - [x] 11.5 Probar reversión forzada ante errores en Bruno.
* **Metadatos:** Prioridad: Alta | Puntos: 8 | Sprint: 2 | Responsable: Wilder Katu | **Estado: Realizado**

---

#### HU-12 · Likes y Dislikes en reseñas
* **Historia:** Como usuaria, quiero votar positiva o negativamente en las reseñas de otros miembros, para destacar los análisis más útiles de la comunidad.
* **Criterios de aceptación:**
  - [x] Prohibición estricta de votar en una reseña propia (responde 403 Forbidden).
  - [x] Un solo voto por usuario y reseña mediante clave primaria compuesta en `reacciones`.
  - [x] Permite cambiar el voto de like a dislike o retirarlo.
  - [x] Contadores actualizados atómicamente y devueltos en la respuesta JSON.
* **Subtareas:**
  - [x] 12.1 Crear modelo `src/models/reaccion.model.js`.
  - [x] 12.2 Crear servicio transaccional `src/services/reacciones.service.js`.
  - [x] 12.3 Configurar ruta `POST /api/v1/resenas/:id/reaccion`.
  - [ ] 12.4 Conectar botones de like/dislike en las tarjetas de reseña del frontend.
* **Metadatos:** Prioridad: Alta | Puntos: 5 | Sprint: 2 | Responsable: Wilder Katu | **Estado: Realizado (Backend listo)**

---

#### HU-13 · Algoritmo de ranking ponderado bayesiano
* **Historia:** Como visitante, quiero ver un Top 10 ponderado que premie la calidad real, la cantidad de reseñas y la actualidad de las opiniones.
* **Criterios de aceptación:**
  - [x] Algoritmo ponderado bayesiano que amortigua títulos con pocas calificaciones extremas (ej. una película con un solo 10 no queda primera).
  - [x] Incorporación del factor de recencia temporal exponencial en días transcurridos.
  - [x] Ponderación por reputación de la reseña según balance de likes y dislikes.
  - [x] Endpoint `GET /api/v1/ranking?limit=10` de respuesta inmediata.
* **Subtareas:**
  - [x] 13.1 Diseñar consulta matemática agregada con score ponderado en MySQL.
  - [x] 13.2 Crear modelo y controlador de ranking en `src/controllers/ranking.controller.js`.
  - [x] 13.3 Documentar fórmula matemática en el README del proyecto.
  - [ ] 13.4 Enlazar ranking al carrusel Top 10 de la pantalla de inicio.
* **Metadatos:** Prioridad: Alta | Puntos: 5 | Sprint: 2 | Responsable: Wilder Katu | **Estado: Realizado (Backend listo)**

---

#### HU-14 · Catálogo con filtros, orden y paginación
* **Historia:** Como visitante, quiero explorar el catálogo filtrando por categoría, buscando por título y ordenando por popularidad o recencia.
* **Criterios de aceptación:**
  - [x] Filtrado por categoría y búsqueda textual flexible (`q`).
  - [x] Ordenamiento por: `ranking`, `popularidad`, `recientes` y `titulo`.
  - [x] Paginación obligatoria con tope máximo de seguridad de 50 registros por página.
  - [ ] Cuadrícula de pósters en `catalogo.html` con chips de categorías interactivos.
* **Subtareas:**
  - [x] 14.1 Implementar validadores de query params en `peliculas.validator.js`.
  - [x] 14.2 Optimizar consulta con índices relacionales en MySQL.
  - [ ] 14.3 Diseñar interfaz de catálogo en `pages/catalogo.html`.
  - [ ] 14.4 Implementar lógica de paginación o botón 'Cargar más' en `js/pages/catalogo.js`.
* **Metadatos:** Prioridad: Alta | Puntos: 5 | Sprint: 2 | Responsable: Wilder Katu | **Estado: En proceso**

---

#### HU-15 · Detalle de película con reseñas y reproductor de tráiler
* **Historia:** Como visitante, quiero consultar la ficha técnica completa de una producción, reproducir su tráiler y leer las críticas de la comunidad.
* **Criterios de aceptación:**
  - [x] Backend preparado con `GET /api/v1/peliculas/:id` y `GET /api/v1/peliculas/:id/resenas`.
  - [ ] Pantalla con póster destacado, metadatos, director, actores y reproductor embebido de tráiler.
  - [ ] Listado de críticas con likes/dislikes y estado vacío cuando aún no existan opiniones.
  - [ ] Formulario de calificación visible solo para usuarias con sesión activa.
* **Subtareas:**
  - [x] 15.1 Incluir `trailer_url` y lista de actores en el DTO de salida.
  - [ ] 15.2 Maquetar pantalla de detalle en `pages/detalle.html`.
  - [ ] 15.3 Implementar reproductor de tráiler (iframe responsivo de YouTube) y selector 1-10.
  - [ ] 15.4 Conectar envío de reseñas mediante `api.js`.
* **Metadatos:** Prioridad: Alta | Puntos: 3 | Sprint: 2 | Responsable: Wilder Katu | **Estado: En proceso**

---

#### HU-16 · Panel web de administración
* **Historia:** Como administradora, quiero gestionar el catálogo y moderar propuestas directamente desde el navegador web, para mantener la plataforma al día.
* **Criterios de aceptación:**
  - [x] Endpoints y control de rol admin listos en backend.
  - [ ] Protección de ruta: redirección automática si no se cuenta con rol de administradora.
  - [ ] Panel para aprobar o rechazar películas pendientes con un solo clic.
  - [ ] Formulario para dar de alta nuevas categorías y editar existentes.
  - [ ] Formulario completo para registrar películas incluyendo enlaces a trailers y actores.
* **Subtareas:**
  - [ ] 16.1 Diseñar layout del panel administrativo en `pages/admin.html` y `css/admin.css`.
  - [ ] 16.2 Implementar tabla de propuestas pendientes con botones de acción.
  - [ ] 16.3 Implementar módulo de categorías con modales de confirmación.
  - [ ] 16.4 Conectar formularios con la API validando respuestas de error.
* **Metadatos:** Prioridad: Alta | Puntos: 5 | Sprint: 2 | Responsable: Evelyn Barrios | **Estado: Por hacer**

---

#### HU-17 · Gestión y visualización de pósters
* **Historia:** Como administradora, quiero asignar la imagen de póster de cada obra con previsualización en tiempo real, para asegurar un catálogo profesional.
* **Criterios de aceptación:**
  - [x] Validación de formato URL y longitud de `imagen_url` en backend.
  - [ ] Campo con vista previa interactiva en miniatura dentro del panel web.
  - [ ] Póster por defecto (`assets/img/poster-default.webp`) ante URLs vacías o rotas.
  - [ ] Manejo de errores visual si la URL no es válida.
* **Subtareas:**
  - [x] 17.1 Validar campo de imagen en `peliculas.validator.js`.
  - [ ] 17.2 Integrar evento `input` en el formulario para actualizar el elemento `<img>` en vivo.
  - [ ] 17.3 Proveer activo gráfico de respaldo en `assets/img/`.
* **Metadatos:** Prioridad: Media | Puntos: 3 | Sprint: 2 | Responsable: Evelyn Barrios | **Estado: Por hacer**

---

#### HU-18 · Documentación Swagger UI y especificación OpenAPI
* **Historia:** Como desarrolladora, quiero documentar la totalidad de endpoints con sus contratos y códigos de respuesta, para facilitar el consumo de la API.
* **Criterios de aceptación:**
  - [x] Interfaz de Swagger UI montada en la ruta `/api-docs` con tema interactivo.
  - [x] Especificación OpenAPI 3.0 completa cubriendo autenticación Bearer, parámetros y esquemas.
  - [x] README técnico con instrucciones de instalación, variables de entorno y ejemplos de endpoints.
  - [x] Diagramas de arquitectura y capas vectoriales SVG vinculados.
* **Subtareas:**
  - [x] 18.1 Crear especificación en `src/docs/openapi.json`.
  - [x] 18.2 Configurar middleware `swagger-ui-express` en `src/config/swagger.js`.
  - [x] 18.3 Redactar README técnico formal en la raíz del backend.
  - [x] 18.4 Elaborar diagramas SVG vectoriales para el repositorio.
* **Metadatos:** Prioridad: Alta | Puntos: 3 | Sprint: 2 | Responsable: Wilder Katu | **Estado: Realizado**

---

#### HU-19 · Suite de pruebas y verificación de casos de borde
* **Historia:** Como equipo de desarrollo, queremos verificar el comportamiento del sistema ante peticiones válidas y casos de error, garantizando alta estabilidad.
* **Criterios de aceptación:**
  - [x] Colección completa de Bruno con 28 peticiones agrupadas y configuradas.
  - [x] Cobertura de casos borde: títulos duplicados (409), notas fuera de rango (400), votos a reseña propia (403), accesos sin token (401) y borrado de categorías con hijos (409).
  - [x] Transacciones verificadas garantizando la consistencia ante fallos.
  - [x] Export estándar en JSON (`KarenFlix-CRUD.postman_collection.json`) para portabilidad.
* **Subtareas:**
  - [x] 19.1 Organizar colección modular en carpeta `bruno/KarenFlix API`.
  - [x] 19.2 Crear archivos de entorno con variables dinámicas (`{{jwt_token}}`).
  - [x] 19.3 Ejecutar y documentar pruebas de casos borde.
  - [x] 19.4 Exportar archivo de colección JSON listo para evaluadores.
* **Metadatos:** Prioridad: Media | Puntos: 3 | Sprint: 2 | Responsable: Evelyn Barrios y Wilder Katu | **Estado: Realizado**

---

#### HU-20 · Entrega final, evidencias y retrospectiva
* **Historia:** Como equipo, queremos consolidar las evidencias del proceso ágil y el material audiovisual de entrega, demostrando el aprendizaje alcanzado.
* **Criterios de aceptación:**
  - [x] Repositorios privados con los docentes (`esalascampuslands` y `Andre Lopez`) como colaboradores.
  - [ ] Documento formal de gestión SCRUM actualizado con capturas del tablero.
  - [ ] Registro de versiones en `CHANGELOG.md` y etiqueta `v1.0.0`.
  - [ ] Video demostrativo de máximo 10 minutos con ambos integrantes en cámara explicando backend y frontend.
  - [x] Historial completo con Conventional Commits.
* **Subtareas:**
  - [ ] 20.1 Incorporar capturas del tablero Kanban actualizado en el documento final.
  - [ ] 20.2 Formalizar retrospectiva del proyecto y compromisos de cierre.
  - [ ] 20.3 Crear tag de entrega `v1.0.0` en Git.
  - [ ] 20.4 Grabar y publicar el video de sustentación técnica.
* **Metadatos:** Prioridad: Alta | Puntos: 3 | Sprint: 2 | Responsable: Evelyn Barrios y Wilder Katu | **Estado: Por hacer**

---

#### HU-21 · Despliegue en la nube
* **Historia:** Como equipo, queremos publicar KarenFlix en servidores en la nube con base de datos accesible vía internet, para permitir su uso desde cualquier navegador.
* **Criterios de aceptación:**
  - [ ] Backend Express desplegado en servidor cloud (Vercel / Railway) respondiendo en `/api/v1/version`.
  - [ ] Base de datos MySQL alojada en la nube con conexión segura SSL (Aiven / Clever Cloud).
  - [ ] Frontend desplegado en Vercel comunicándose fluidamente con el backend remoto.
  - [ ] Variables de entorno protegidas en los paneles de despliegue, nunca subidas al repositorio.
  - [ ] Políticas de CORS actualizadas con el dominio final del frontend.
* **Subtareas:**
  - [ ] 21.1 Crear base de datos MySQL en la nube y migrar esquema y semillas.
  - [ ] 21.2 Desplegar backend en Vercel con punto de entrada `src/index.js`.
  - [ ] 21.3 Publicar frontend y apuntar `config.js` al dominio de producción.
  - [ ] 21.4 Probar flujo completo en línea y enlazar URLs en los README.
* **Metadatos:** Prioridad: Alta | Puntos: 3 | Sprint: 2 | Responsable: Evelyn Barrios y Wilder Katu | **Estado: Por hacer**

---

## 04 Herramienta de seguimiento

### Herramienta Seleccionada
* **Plataforma:** **GitHub Projects (v2 / Beta)**
* **Enlace público al tablero Kanban:** [https://github.com/users/barriosevelyn488-web/projects/1](https://github.com/users/barriosevelyn488-web/projects/1)
* **Pestaña en el repositorio:** [https://github.com/barriosevelyn488-web/Karenflix_backend/projects](https://github.com/barriosevelyn488-web/Karenflix_backend/projects)
* **Tipo de acceso:** Público / Colaboradores asignados: `barriosevelyn488-web`, `WilKtu`, `esalascampuslands`.
* **Fecha de inicialización:** 26/10/2026.

### Flujo del Tablero (5 Columnas Profesionales)

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────────────┐    ┌─────────────────┐    ┌───────────────────────────┐
│    Por hacer    │───▶│   En proceso    │───▶│  Testing / En revisión  │───▶│    Realizado    │───▶│  Desplegado / Finalizado  │
└─────────────────┘    └─────────────────┘    └─────────────────────────┘    └─────────────────┘    └───────────────────────────┘
```

1. **Por hacer (To Do):** Historias aprobadas y planificadas para ser abordadas.
2. **En proceso (In Progress):** Tareas en desarrollo activo en sus respectivas ramas de feature.
3. **Testing / En revisión (Review & QA):** Pull Request abierto; revisión cruzada de código ("Explícame tu PR") y pruebas en Bruno.
4. **Realizado (Done):** Pull Request aprobado y mergeado a `develop`, cumpliendo estrictamente con la Definición de Hecho (DoD).
5. **Desplegado / Finalizado (Deployed):** Funcionalidad desplegada en producción en Vercel con la base de datos en la nube.

### Campos Registrados en Cada Tarjeta
* **Título y Código:** Identificador formal (ej. `HU-07 · Registro y gestión de películas y series`).
* **Responsable (Assignee):** Persona que programa y sustenta el módulo (`barriosevelyn488-web` o `WilKtu`).
* **Puntos de historia:** Estimación según complejidad (2, 3, 5 u 8 puntos).
* **Prioridad:** Alta, Media o Baja.
* **Sprint:** Sprint 1 o Sprint 2.
* **Épica:** Identificador de módulo funcional (EP-01 a EP-08).
* **Checklist interactivo:** Subtareas y criterios marcables `- [x]`.

---

## 05 Evidencias y Cierre del Proyecto

### Lista de Verificación de Entregables

| Evidencia | Descripción del Entregable | Ubicación / Enlace Oficial | Estado |
| :--- | :--- | :--- | :---: |
| **Repositorio Backend** | Código fuente Node.js + Express + MySQL con historial de commits limpios | [github.com/barriosevelyn488-web/Karenflix_backend](https://github.com/barriosevelyn488-web/Karenflix_backend) | **Entregado** |
| **Repositorio Frontend** | Código HTML, CSS y JS puro desacoplado en repositorio independiente | [github.com/WilKtu/karenflix-frontend](https://github.com/WilKtu/karenflix-frontend) | **En desarrollo** |
| **Tablero Kanban SCRUM** | Tablero GitHub Projects con las 21 historias clasificadas y trazables | [github.com/users/barriosevelyn488-web/projects/1](https://github.com/users/barriosevelyn488-web/projects/1) | **Operativo** |
| **Colección de Pruebas** | Suite de pruebas en Bruno con 28 peticiones y export JSON estándar | Carpeta `bruno/KarenFlix API` en el repositorio backend | **Entregado** |
| **Diagramas de Arquitectura** | 5 diagramas SVG vectoriales explicando flujo, capas y MySQL | Carpeta `docs/diagramas/` en el repositorio backend | **Entregado** |
| **Documentación Swagger** | Contrato OpenAPI interactivo montado en `/api-docs` | Ruta local `http://localhost:3000/api-docs` | **Entregado** |
| **Video de Sustentación** | Grabación en cámara explicando código backend y demo funcional | Enlace a YouTube / Drive (se adjunta en README al cierre) | **Pendiente** |

---

### Retrospectiva y Evaluación del Proceso

#### 1. ¿Qué funcionó muy bien?
* **Arquitectura limpia desacoplada:** La separación estricta en capas (`routes ➔ middlewares ➔ validators ➔ controllers ➔ services ➔ models`) facilitó el rastreo de errores y permitió que cada archivo cumpla una única responsabilidad (Single Responsibility Principle).
* **Transacciones ACID reales:** El uso de `connection.beginTransaction()`, `commit()` y `rollback()` con `SELECT ... FOR UPDATE` evitó inconsistencias de datos al registrar reseñas y actualizar promedios de calificación.
* **Seguridad integral:** La combinación de cookies `HttpOnly` para navegadores y soporte de `Bearer tokens` para Bruno y Swagger resolvió de forma elegante los requerimientos de seguridad y pruebas.
* **Normalización relacional:** El modelado en 3FN con tablas `actores`, `directores` y `pelicula_actor` garantiza una base de datos libre de redundancias.

#### 2. ¿Qué se identificó para mejorar?
* **Sincronización de contratos de API temprana:** Al inicio del Sprint 2 se identificó una pequeña discrepancia en la URL base del frontend (`/api` frente a `/api/v1`), la cual se subsanó formalizando el documento de contrato de endpoints antes de conectar las pantallas.
* **Estimación de esfuerzo en frontend:** La maquetación responsive y el manejo de estados visuales (toasts, modales y loaders) requirió un tiempo adicional al estimado inicialmente en Planning Poker.

#### 3. Próximos pasos y compromisos de cierre
1. Culminar la pantalla del panel de administración (`admin.html`) para moderación y gestión de catálogo.
2. Integrar las vistas de catálogo y detalle de película con el reproductor de trailers en el frontend.
3. Realizar el aprovisionamiento de la base de datos MySQL en la nube con certificado SSL y desplegar ambos repositorios en Vercel.
4. Grabar el video demostrativo de 10 minutos con ambos integrantes en cámara para la sustentación final.
