import { body } from "express-validator";
export const validarResena = [
  body("calificacion").isInt({ min: 1, max: 10 }).withMessage("La calificación debe ser entre 1 y 10")
];
export const validarReaccion = [
  body("tipo").isIn(["like", "dislike"]).withMessage("El tipo de reacción debe ser like o dislike")
];
