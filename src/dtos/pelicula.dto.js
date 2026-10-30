export const peliculaDto = (pelicula) => ({
  id: pelicula.id,
  titulo: pelicula.titulo,
  descripcion: pelicula.descripcion,
  tipo: pelicula.tipo,
  anio: pelicula.anio,
  duracion_minutos: pelicula.duracion_minutos,
  categoria: { id: pelicula.categoria_id, nombre: pelicula.categoria_nombre },
  director: pelicula.director_nombre || null,
  actores: pelicula.actores || [],
  imagen_url: pelicula.imagen_url,
  trailer_url: pelicula.trailer_url,
  estado: pelicula.estado,
  rating_promedio: pelicula.rating_promedio,
  total_resenas: pelicula.total_resenas,
  created_at: pelicula.created_at
});
