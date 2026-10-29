export const normalizarTexto = (texto = '') =>
  texto.trim().toLocaleLowerCase('es').replace(/\s+/g, ' ');

export const normalizarTitulo = (titulo = '') =>
  normalizarTexto(titulo.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
