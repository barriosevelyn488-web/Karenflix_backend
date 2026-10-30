import { RankingService } from '../services/ranking.service.js';

// La ruta de ranking entrega el límite solicitado al servicio de dominio.
export const obtenerRanking = async (req, res, next) => {
  try {
    res.json({
      status: 'success',
      data: await RankingService.obtenerRanking(req.query.limit || 10)
    });
  } catch (error) {
    next(error);
  }
};
