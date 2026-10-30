import { RankingModel } from '../models/ranking.model.js';

// Limita la consulta antes de pedir el ranking calculado por RankingModel.
export const RankingService = {
  obtenerRanking(limit = 10) {
    const boundedLimit = Math.min(Math.max(Number(limit) || 10, 1), 50);
    return RankingModel.listarPorScore(boundedLimit);
  }
};
