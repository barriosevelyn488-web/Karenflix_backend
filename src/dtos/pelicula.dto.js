export const peliculaDto = (movie) => ({
  id: movie.id,
  titulo: movie.titulo,
  descripcion: movie.descripcion,
  tipo: movie.tipo,
  anio: movie.anio,
  duracion_minutos: movie.duracion_minutos,
  categoria: { id: movie.categoria_id, nombre: movie.categoria_nombre },
  director: movie.director_nombre || null,
  actores: movie.actores || [],
  imagen_url: movie.imagen_url,
  trailer_url: movie.trailer_url,
  estado: movie.estado,
  rating_promedio: movie.rating_promedio,
  total_resenas: movie.total_resenas,
  created_at: movie.created_at
});
