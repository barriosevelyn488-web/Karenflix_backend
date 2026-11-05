// Implementar en el backend un endpoint que, dado el ID de una película, genere un archivo CSV con todas sus reseñas.
// Nombre del usuario que hizo la reseña
// Calificación asignada (1 a 5)
// Comentario escrito
// Fecha de creación de la reseña

import { ResenaModel } from '../models/resena.model.js';
import { AppError } from '../utils/AppError.js';


export const exportarResenasCSV = {
 // Función para exportar todas las reseñas de una película a CSV a partir del ID de la película hacia la carpeta /exports
  async exportarResenasPorPelicula(peliculaId) {
    const resenas = await ResenaModel.buscarPorPeliculaId(peliculaId);
    if (!resenas || resenas.length === 0) {
      throw new AppError('No se encontraron reseñas para esta película.', 404, 'NOT_FOUND');
    }

    const csvHeader = 'Nombre de Usuario,Calificación,Comentario\n';
    const csvRows = resenas.map(resena => {
      const nombreUsuario = resena.usuario_id;
      const calificacion = resena.calificacion;
      const comentario = resena.comentario.replace(/,/g, '');
      return `${nombreUsuario},${calificacion},${comentario}`;
    }).join('\n');

    const csvContent = csvHeader + csvRows;

    const fs = await import('fs');
    const path = await import('path');
    const exportPath = path.resolve('exports', `resenas_pelicula_${peliculaId}.csv`);
    fs.writeFileSync(exportPath, csvContent);

    return exportPath; 
  }
};
