import { body, param, query } from 'express-validator';
const validUrl = (value) => value == null || value === '' || /^https?:\/\//i.test(value);
export const validarPelicula = [
  body('titulo').trim().isLength({ min: 1, max: 150 }),
  body('descripcion').trim().isLength({ min: 1, max: 10000 }),
  body('categoria_id').isInt({ min: 1 }).toInt(),
  body('tipo').isIn(['pelicula', 'serie', 'anime']),
  body('anio')
    .isInt({ min: 1888, max: new Date().getFullYear() + 5 })
    .toInt(),
  body('duracion_minutos').optional({ nullable: true }).isInt({ min: 1, max: 10000 }).toInt(),
  body('imagen_url').optional({ nullable: true }).isLength({ max: 2048 }).custom(validUrl),
  body('trailer_url').optional({ nullable: true }).isLength({ max: 2048 }).custom(validUrl),
  body('director').optional({ nullable: true }).trim().isLength({ max: 150 }),
  body('actores').optional().isArray({ max: 50 }),
  body('actores.*').optional().isString().trim().isLength({ min: 1, max: 150 })
];
export const validarIdPelicula = [param('id').isInt({ min: 1 }).toInt()];
export const validarListadoPeliculas = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
  query('categoria_id').optional().isInt({ min: 1 }).toInt(),
  query('orden').optional().isIn(['ranking', 'popularidad', 'recientes', 'titulo']),
  query('q').optional().trim().isLength({ max: 150 })
];
export const validarEstadoPelicula = [
  param('id').isInt({ min: 1 }).toInt(),
  body('estado').isIn(['aprobada', 'rechazada'])
];
export const validarLimiteRanking = [query('limit').optional().isInt({ min: 1, max: 50 }).toInt()];
