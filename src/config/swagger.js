import swaggerUi from 'swagger-ui-express';
import { env } from './env.js';

// Respuestas comunes reutilizadas en las definiciones de cada endpoint.
const ok = { 200: { description: 'Operación completada' } };
const created = { 201: { description: 'Recurso creado' } };
const unauthorized = { 401: { description: 'Se requiere autenticación' } };
const forbidden = { 403: { description: 'Permiso insuficiente' } };

// Este documento alimenta Swagger UI, montado en /api-docs desde app.js.
export const swaggerDocument = {
  openapi: '3.0.3',
  info: {
    title: 'KarenFlix API',
    version: env.apiVersion,
    description: 'API REST para catálogo, autenticación, reseñas y rankings de KarenFlix.'
  },
  servers: [{ url: '/api/v1' }],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      sessionCookie: { type: 'apiKey', in: 'cookie', name: env.jwt.cookieName }
    }
  },
  paths: {
    '/version': { get: { summary: 'Consultar versión', responses: ok } },
    '/auth/register': {
      post: {
        summary: 'Registrar usuario',
        responses: {
          ...created,
          400: { description: 'Datos inválidos' },
          409: { description: 'Email duplicado' }
        }
      }
    },
    '/auth/login': {
      post: {
        summary: 'Iniciar sesión',
        responses: { ...ok, 401: { description: 'Credenciales inválidas' } }
      }
    },
    '/auth/logout': {
      post: { summary: 'Cerrar sesión', responses: { 204: { description: 'Cookie eliminada' } } }
    },
    '/auth/me': {
      get: {
        summary: 'Consultar sesión',
        security: [{ bearerAuth: [] }, { sessionCookie: [] }],
        responses: { ...ok, ...unauthorized }
      }
    },
    '/categorias': {
      get: { summary: 'Listar categorías', responses: ok },
      post: {
        summary: 'Crear categoría (admin)',
        security: [{ bearerAuth: [] }, { sessionCookie: [] }],
        responses: { ...created, ...unauthorized, ...forbidden }
      }
    },
    '/categorias/{id}': {
      put: {
        summary: 'Editar categoría (admin)',
        security: [{ bearerAuth: [] }, { sessionCookie: [] }],
        responses: { ...ok, ...unauthorized, ...forbidden }
      },
      delete: {
        summary: 'Eliminar categoría (admin)',
        security: [{ bearerAuth: [] }, { sessionCookie: [] }],
        responses: {
          204: { description: 'Eliminada' },
          409: { description: 'Categoría en uso' },
          ...unauthorized,
          ...forbidden
        }
      }
    },
    '/peliculas': {
      get: { summary: 'Catálogo público, filtros y paginación', responses: ok },
      post: {
        summary: 'Proponer título',
        security: [{ bearerAuth: [] }, { sessionCookie: [] }],
        responses: { ...created, ...unauthorized }
      }
    },
    '/peliculas/{id}': {
      get: { summary: 'Detalle aprobado con actores y tráiler', responses: ok },
      put: {
        summary: 'Editar título (admin)',
        security: [{ bearerAuth: [] }, { sessionCookie: [] }],
        responses: { ...ok, ...unauthorized, ...forbidden }
      },
      delete: {
        summary: 'Eliminar título (admin)',
        security: [{ bearerAuth: [] }, { sessionCookie: [] }],
        responses: { 204: { description: 'Eliminado' }, ...unauthorized, ...forbidden }
      }
    },
    '/peliculas/admin/pendientes': {
      get: {
        summary: 'Listar propuestas pendientes (admin)',
        security: [{ bearerAuth: [] }, { sessionCookie: [] }],
        responses: { ...ok, ...unauthorized, ...forbidden }
      }
    },
    '/peliculas/admin/{id}/estado': {
      patch: {
        summary: 'Aprobar o rechazar propuesta (admin)',
        security: [{ bearerAuth: [] }, { sessionCookie: [] }],
        responses: { ...ok, ...unauthorized, ...forbidden }
      }
    },
    '/peliculas/{id}/resenas': {
      get: { summary: 'Listar reseñas de un título', responses: ok },
      post: {
        summary: 'Crear reseña autenticada',
        security: [{ bearerAuth: [] }, { sessionCookie: [] }],
        responses: {
          ...created,
          ...unauthorized,
          409: { description: 'Ya existe reseña para este usuario' }
        }
      }
    },
    '/resenas/{id}': {
      put: {
        summary: 'Editar reseña propia',
        security: [{ bearerAuth: [] }, { sessionCookie: [] }],
        responses: { ...ok, ...unauthorized, ...forbidden }
      },
      delete: {
        summary: 'Eliminar reseña propia',
        security: [{ bearerAuth: [] }, { sessionCookie: [] }],
        responses: { 204: { description: 'Eliminada' }, ...unauthorized, ...forbidden }
      }
    },
    '/resenas/{id}/reaccion': {
      post: {
        summary: 'Crear/cambiar like o dislike',
        security: [{ bearerAuth: [] }, { sessionCookie: [] }],
        responses: { ...ok, ...unauthorized, ...forbidden }
      },
      delete: {
        summary: 'Quitar reacción',
        security: [{ bearerAuth: [] }, { sessionCookie: [] }],
        responses: { ...ok, ...unauthorized, ...forbidden }
      }
    },
    '/ranking': { get: { summary: 'Consultar ranking ponderado', responses: ok } }
  }
};

export const swaggerMiddleware = [swaggerUi.serve, swaggerUi.setup(swaggerDocument)];
