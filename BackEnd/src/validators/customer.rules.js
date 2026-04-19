import { body } from 'express-validator';

export const rulesCreateCustomer = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre es requerido"),
  body("email")
    .trim()
    .notEmpty().withMessage("El email es requerido")
    .isEmail().withMessage("El email debe ser válido"),
  body("contacto")
    .trim()
    .notEmpty().withMessage("El número de contacto es requerido"),
  body("identificacion")
    .trim()
    .notEmpty().withMessage("El número de identificación es requerido"),
  body("paisresidencia")
    .trim()
    .notEmpty().withMessage("El pais de residencia es requerido")
];
