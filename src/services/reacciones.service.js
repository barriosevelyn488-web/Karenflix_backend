import { ReaccionModel } from '../models/reaccion.model.js';
import { ResenaModel } from '../models/resena.model.js';
import { AppError } from '../utils/AppError.js';

// Valida la reseña y delega la persistencia de reacciones a ReaccionModel.
export const ReaccionService = {
  async reaccionar({ usuarioId, resenaId, tipo }) {
    const resena = await ResenaModel.buscarPorId(resenaId);
    if (!resena) throw new AppError('Reseña no encontrada.', 404, 'NOT_FOUND');
    if (Number(resena.usuario_id) === Number(usuarioId))
      throw new AppError('No puedes reaccionar a tu propia reseña.', 403, 'OWN_REVIEW');
    return ReaccionModel.registrarReaccion({ usuarioId, resenaId, tipo });
  },
  async quitar({ usuarioId, resenaId }) {
    const resena = await ResenaModel.buscarPorId(resenaId);
    if (!resena) throw new AppError('Reseña no encontrada.', 404, 'NOT_FOUND');
    if (Number(resena.usuario_id) === Number(usuarioId))
      throw new AppError('No puedes reaccionar a tu propia reseña.', 403, 'OWN_REVIEW');
    return ReaccionModel.quitar({ usuarioId, resenaId });
  }
};
