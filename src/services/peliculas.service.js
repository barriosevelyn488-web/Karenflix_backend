import { PeliculaModel } from '../models/pelicula.model.js';
import { AppError } from '../utils/AppError.js';
export const PeliculaService = {
  listar: (query) => PeliculaModel.listar(query),
  async obtener(id) {
    const item = await PeliculaModel.obtener(id);
    if (!item || item.estado !== 'aprobada')
      throw new AppError('Película no encontrada.', 404, 'NOT_FOUND');
    return item;
  },
  crear: (data, userId) => PeliculaModel.crear(data, userId),
  pendientes: () =>
    PeliculaModel.listar({ page: 1, limit: 50, estado: 'pendiente', orden: 'recientes' }),
  async estado(id, estado, adminId) {
    if (!(await PeliculaModel.cambiarEstado(id, estado, adminId)))
      throw new AppError('Película no encontrada.', 404, 'NOT_FOUND');
  },
  async actualizar(id, data) {
    if (!(await PeliculaModel.actualizar(id, data)))
      throw new AppError('Película no encontrada.', 404, 'NOT_FOUND');
  },
  async eliminar(id) {
    if (!(await PeliculaModel.eliminar(id)))
      throw new AppError('Película no encontrada.', 404, 'NOT_FOUND');
  }
};
