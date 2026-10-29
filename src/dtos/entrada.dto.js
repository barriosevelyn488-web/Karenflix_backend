export const usuarioEntradaDto = ({ nombre, email, password }) => ({
  nombre,
  email,
  password
});

export const categoriaEntradaDto = ({ nombre, descripcion }) => ({
  nombre,
  descripcion
});

export const peliculaEntradaDto = ({
  titulo,
  descripcion,
  tipo,
  anio,
  duracion_minutos,
  categoria_id,
  director,
  actores,
  imagen_url,
  trailer_url
}) => ({
  titulo,
  descripcion,
  tipo,
  anio,
  duracion_minutos,
  categoria_id,
  director,
  actores,
  imagen_url,
  trailer_url
});

export const resenaEntradaDto = ({ titulo, comentario, calificacion }) => ({
  titulo,
  comentario,
  calificacion
});
