import { RankingService } from '../services/ranking.service.js';
export const obtenerRanking = async (req, res, next) => {
  try {
    res.json({
      status: 'success',
      data: await RankingService.obtenerRanking(req.query.limit || 10)
    });
  } catch (e) {
    next(e);
  }
};
