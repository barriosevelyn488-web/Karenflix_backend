export const resenaDto = (resena) => ({
  id: resena.id,
  pelicula_id: resena.pelicula_id,
  usuario_id: resena.usuario_id,
  usuario_nombre: resena.usuario_nombre,
  titulo: resena.titulo,
  comentario: resena.comentario,
  calificacion: resena.calificacion,
  likes: resena.likes,
  dislikes: resena.dislikes,
  created_at: resena.created_at,
  updated_at: resena.updated_at
});
