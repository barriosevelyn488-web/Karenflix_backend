export const calcularScorePonderado = (calificacionPromedio, totalResenas) => {
  const m = 3; // Mínimo de reseñas de confianza
  const C = 5.0; // Calificación media global estimada
  
  if (!totalResenas || totalResenas === 0) return 0;
  
  const score = (totalResenas / (totalResenas + m)) * calificacionPromedio + (m / (totalResenas + m)) * C;
  return parseFloat(score.toFixed(2));
};
