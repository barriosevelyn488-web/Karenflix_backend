export const resenaDto = (r) => ({
  id: r.id,
  pelicula_id: r.pelicula_id,
  usuario_id: r.usuario_id,
  usuario_nombre: r.usuario_nombre,
  titulo: r.titulo,
  comentario: r.comentario,
  calificacion: r.calificacion,
  likes: r.likes,
  dislikes: r.dislikes,
  created_at: r.created_at,
  updated_at: r.updated_at
});
