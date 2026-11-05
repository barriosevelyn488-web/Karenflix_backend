import { BaseController } from './base.controller.js';
import { rankingService as defaultRankingService, RankingService } from '../services/ranking.service.js';

export class RankingController extends BaseController {
  constructor(rankingService = defaultRankingService) {
    super();
    this.rankingService = rankingService;
  }

  obtenerRanking = async (req, res, next) => {
    try {
      const { limit } = req.query;
      const ranking = await this.rankingService.obtenerRanking(limit || 10);
      return this.sendSuccess(res, ranking);
    } catch (error) {
      this.handleError(next, error);
    }
  };
}

export const rankingController = new RankingController();
export const obtenerRanking = rankingController.obtenerRanking;
export default RankingController;
