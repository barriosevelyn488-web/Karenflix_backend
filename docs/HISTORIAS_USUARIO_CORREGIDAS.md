# Historias de usuario corregidas para KarenFlix

El proyecto usa MySQL, como indicó el profesor. Se mantienen los IDs HU-01 a HU-21 para poder compararlos con la planificación anterior. En GitHub Projects, cambia el estado de una historia cuando exista un PR o una prueba que muestre el avance.

## Historias existentes revisadas

| HU                          | Estado a contrastar         | Criterio corregido                                                                                                                                       |
| --------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HU-01 Configuración y BD    | Infraestructura             | Node/Express, pool único mysql2/promise, variables de entorno, esquema InnoDB versionado, ningún secreto en Git.                                         |
| HU-02 Arquitectura/errores  | Pendiente de evidencia      | Rutas, middlewares, controllers HTTP, services negocio, models/repositorios SQL, DTOs, fábrica DTO y formato de error común con 404.                     |
| HU-03 Registro              | Seguridad                   | Email normalizado/único, bcrypt, rol siempre usuario, DTO nunca expone hash, duplicado responde 409.                                                     |
| HU-04 Login JWT             | Seguridad                   | Credenciales genéricas, JWT con expiración/issuer/audience, cookie HttpOnly, logout, GET me y compatibilidad Bearer mientras se integra el frontend.     |
| HU-05 Roles y seguridad     | Seguridad                   | Admin se verifica contra DB; 401/403 claros; CORS allowlist; rate limit global/auth; Helmet, validación y protección Origin para operaciones con cookie. |
| HU-06 Categorías            | Funcional                   | GET real; POST/PUT/DELETE admin; nombre único; no borrar categorías referenciadas.                                                                       |
| HU-07 Películas y series    | Funcional                   | Propuesta persistida pendiente, título normalizado único, validación, catálogo público solo aprobado, búsqueda y paginación acotada.                     |
| HU-08 Aprobación            | Funcional                   | Solo admin ve pendientes y cambia estado; se registra aprobador; 404 inexistente.                                                                        |
| HU-09 Frontend base         | Wilder/repositorio frontend | Contrato acordado: estructuras de respuesta, login/logout, manejo de errores y fetch con credentials include al usar cookie.                             |
| HU-10 Datos prueba          | Datos locales               | Seed repetible sin contraseñas predeterminadas; datos sintéticos; elevar admin manualmente con acceso seguro a Workbench.                                |
| HU-11 Reseñas               | Funcional                   | Una por usuario/título; CRUD propio; recálculo de promedio y total en transacción.                                                                       |
| HU-12 Reacciones            | Funcional                   | Like/dislike único por usuario, cambio y retiro; no reaccionar a reseña propia; contadores sincronizados transaccionalmente.                             |
| HU-13 Ranking               | Funcional                   | Promedio bayesiano, señal de votos y recencia; límite de 1 a 50; fórmula documentada.                                                                    |
| HU-14 Listado               | Funcional                   | Filtro/búsqueda parametrizados, orden en allowlist, paginación máximo 50.                                                                                |
| HU-15 Detalle               | Integración                 | Categoría, director, actores, imagen, tráiler, rating, reseñas y estados vacíos.                                                                         |
| HU-16 Panel admin           | Wilder/repositorio frontend | Consume endpoints admin, presenta errores backend y confirma borrados.                                                                                   |
| HU-17 Imagen/tráiler/elenco | Catálogo                    | URLs HTTP(S), trailer_url y relación muchos-a-muchos para actores; evitar almacenamiento local efímero en hosting serverless.                            |
| HU-18 Documentación         | Equipo                      | README, Swagger, contrato, diagramas ER/arquitectura/secuencia y link frontend.                                                                          |
| HU-19 Pruebas Bruno         | Verificación manual         | Positivos, validación, duplicados, roles, JWT, rate limit, transacciones; guardar evidencia de ejecución real.                                           |
| HU-20 Entrega SCRUM         | Equipo                      | Tablero, PRs/reviews, PDF y video; cerrar historias respaldadas por evidencia.                                                                           |
| HU-21 Despliegue            | Configuración manual        | MySQL cloud con TLS, secrets del proveedor, CORS del frontend y smoke test end-to-end.                                                                   |

## Nuevas historias de cierre

### HU-22 — Seguridad y configuración reproducible

Como responsable backend quiero que la API valide configuración, limite abuso, proteja sesión y cierre conexiones con limpieza, para ejecutar en Windows, Linux y hosting.
Criterios: producción falla claramente si faltan secretos/configuración crítica; credenciales solo fuera del repo; CORS exacto; trust proxy deliberado; cookies seguras; conexión MySQL TLS; guía de instalación repetible.

### HU-23 — Normalización de catálogo

Como equipo quiero almacenar actores una vez y relacionarlos con títulos, para evitar repetir nombres y permitir elencos.
Criterios: tablas actores y pelicula_actor con PK/FK/unique; trailer_url opcional validada; migración respaldada para la BD Sprint 2; rating/reacciones actualizados dentro de transacción.

### HU-24 — Contrato Backend/Frontend

Como equipo quiero acordar rutas, payloads, sesión y errores antes de conectar repos, para integrar sin cambios sorpresivos.
Criterios: Wilder confirma login, catálogo, detalle, reseña y rol admin; el cliente usa credentials include para cookies o Bearer durante transición; se conservan ejemplos Bruno.

### HU-25 — Cierre verificable

Como equipo quiero ejecutar Bruno contra MySQL local y registrar evidencias, para demostrar un flujo completo.
Criterios: versión, registro/login, permisos, catálogo, propuesta/aprobación, reseña/reacción, errores y rate limit ejecutados; defectos reportados antes del despliegue.

## Ramas sugeridas

Trabajar por bloque y PR revisado. Dependencias: HU-22 seguridad/fundación → HU-23 catálogo/datos → HU-11 a HU-13 reseñas/ranking → HU-19 Bruno/documentación. Usar nombres feature/hu-XX-descripcion y commits pequeños. El repositorio frontend sigue siendo responsabilidad de Wilder; no editarlo sin coordinación.
