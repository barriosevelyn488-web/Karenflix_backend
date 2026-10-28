import { body } from "express-validator";
export const validarPelicula = [
  body("titulo").notEmpty().withMessage("El título es obligatorio"),
  body("categoria_id").isInt().withMessage("El ID de la categoría debe ser un entero")
];
