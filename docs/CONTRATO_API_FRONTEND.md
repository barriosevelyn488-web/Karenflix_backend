# Contrato de integración frontend

Base local: http://localhost:3000/api/v1. Base pública se configurará en el entorno de despliegue; no dejar URLs de producción dentro del código.

## Sesión

POST auth/register y POST auth/login reciben JSON. La respuesta es {status:"success",data:{usuario,token}} y también establece cookie HttpOnly. Para cookie, fetch necesita credentials: "include". Para el cliente ya preparado con bearer, Authorization: Bearer token también está aceptado. POST auth/logout limpia cookie; GET auth/me devuelve el perfil sin password_hash.

## Catálogo

GET peliculas admite page, limit máximo 50, categoria_id, q y orden (ranking, popularidad, recientes, titulo). Respuesta: data.items y data.pagination. Cada item incluye título, descripción, tipo, año, categoría, director, imagen_url, trailer_url, rating_promedio y total_resenas.

GET peliculas/:id devuelve detalle aprobado e incluye actores. GET peliculas/:id/resenas devuelve reseñas; POST crea la reseña de la sesión. PUT/DELETE resenas/:id solo permite a quien la escribió.

## Administración

POST peliculas registra propuesta pendiente. GET peliculas/admin/pendientes y PATCH peliculas/admin/:id/estado requieren admin. CRUD de categorías y edición/eliminación de películas también requiere admin. El usuario admin se asigna manualmente desde Workbench después de un registro confiable.

## Errores

Validación retorna HTTP 400 y error.details. Sin sesión: 401. Sin rol: 403. Inexistente: 404. Duplicado o categoría en uso: 409. La forma es {status:"fail",error:{code,message,details?,requestId}}.

## Trailers y actores

trailer_url e imagen_url son URL opcionales HTTP/HTTPS. Actores se envían como lista de nombres al proponer/editar un título y el backend los guarda mediante pelicula_actor.
