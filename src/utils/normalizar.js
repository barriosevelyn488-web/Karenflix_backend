export const normalizarTexto = (texto) => {
  return texto
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
};
