import { ReaccionModel } from '../models/reaccion.model.js';
import { ResenaModel } from '../models/resena.model.js';

export const ReaccionService = {
  async reaccionar({ usuarioId, resenaId, tipo }) {
    const resena = await ResenaModel.buscarPorId(resenaId);
    if (!resena) {
      const err = new Error('Reseña no encontrada.');
      err.statusCode = 404;
      throw err;
    }

    if (resena.usuario_id === usuarioId) {
      const err = new Error('No puedes reaccionar a tu propia reseña.');
      err.statusCode = 403;
      throw err;
    }

    const resultado = await ReaccionModel.registrarReaccion({ usuarioId, resenaId, tipo });
    return resultado;
  }
};
