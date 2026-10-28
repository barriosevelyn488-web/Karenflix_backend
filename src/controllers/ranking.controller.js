import { RankingService } from '../services/ranking.service.js';

export const obtenerRanking = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const ranking = await RankingService.obtenerRanking(limit || 10);
    res.status(200).json({ status: 'success', data: ranking });
  } catch (error) {
    next(error);
  }
};
