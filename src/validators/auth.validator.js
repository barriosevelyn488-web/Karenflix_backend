import { body } from "express-validator";
export const validarRegistro = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("email").isEmail().withMessage("Debe proporcionar un email válido"),
  body("password").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres")
];
export const validarLogin = [
  body("email").isEmail().withMessage("Debe proporcionar un email válido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria")
];
