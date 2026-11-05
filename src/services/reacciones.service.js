import { BaseService } from './base.service.js';
import { reaccionModel as defaultReaccionModel, ReaccionModel } from '../models/reaccion.model.js';
import { resenaModel as defaultResenaModel, ResenaModel } from '../models/resena.model.js';

export class ReaccionesService extends BaseService {
  constructor(reaccionModel = defaultReaccionModel, resenaModel = defaultResenaModel) {
    super();
    this.reaccionModel = reaccionModel;
    this.resenaModel = resenaModel;
  }

  async reaccionar({ usuarioId, resenaId, tipo }) {
    const resena = await this.resenaModel.buscarPorId(resenaId);
    if (!resena) {
      throw this.createError('Reseña no encontrada.', 404);
    }

    if (!['like', 'dislike'].includes(tipo)) {
      throw this.createError('El tipo de reacción debe ser like o dislike.', 400);
    }

    return await this.reaccionModel.registrarReaccion({ usuarioId, resenaId, tipo });
  }
}

export const reaccionesService = new ReaccionesService();
export const ReaccionService = reaccionesService;
export default ReaccionesService;
