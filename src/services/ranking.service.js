import { BaseService } from './base.service.js';
import { peliculaModel as defaultPeliculaModel, PeliculaModel } from '../models/pelicula.model.js';
import { calcularScorePonderado } from '../utils/ranking.js';

export class RankingService extends BaseService {
  constructor(peliculaModel = defaultPeliculaModel) {
    super();
    this.peliculaModel = peliculaModel;
  }

  async obtenerRanking(limit = 10) {
    const peliculas = await this.peliculaModel.listarAprobadas({ limit: 100 });

    const conScore = peliculas.map((p) => {
      const peliculaJson = p.toJSON();
      const score = calcularScorePonderado(peliculaJson.rating_promedio, peliculaJson.total_resenas);
      return {
        ...peliculaJson,
        score_ponderado: score
      };
    });

    conScore.sort((a, b) => {
      if (b.score_ponderado !== a.score_ponderado) {
        return b.score_ponderado - a.score_ponderado;
      }
      return b.rating_promedio - a.rating_promedio;
    });

    const parsedLimit = parseInt(limit, 10) || 10;
    return conScore.slice(0, parsedLimit);
  }
}

export const rankingService = new RankingService();
export default RankingService;
