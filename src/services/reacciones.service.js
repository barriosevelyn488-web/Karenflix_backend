import { ReaccionModel } from '../models/reaccion.model.js';
import { ResenaModel } from '../models/resena.model.js';
import { AppError } from '../utils/AppError.js';
export const ReaccionService = {
  async reaccionar({ usuarioId, resenaId, tipo }) {
    const review = await ResenaModel.buscarPorId(resenaId);
    if (!review) throw new AppError('Reseña no encontrada.', 404, 'NOT_FOUND');
    if (Number(review.usuario_id) === Number(usuarioId))
      throw new AppError('No puedes reaccionar a tu propia reseña.', 403, 'OWN_REVIEW');
    return ReaccionModel.registrarReaccion({ usuarioId, resenaId, tipo });
  },
  async quitar({ usuarioId, resenaId }) {
    const review = await ResenaModel.buscarPorId(resenaId);
    if (!review) throw new AppError('Reseña no encontrada.', 404, 'NOT_FOUND');
    if (Number(review.usuario_id) === Number(usuarioId))
      throw new AppError('No puedes reaccionar a tu propia reseña.', 403, 'OWN_REVIEW');
    return ReaccionModel.quitar({ usuarioId, resenaId });
  }
};
