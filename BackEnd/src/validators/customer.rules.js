import { body } from 'express-validator';

export const rulesCreateCustomer = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre es requerido")
    .isLength({min: 6}).withMessage("El nombre del cliente debe tener al menos 6 caracteres"),
  body("email")
    .trim()
    .notEmpty().withMessage("El email es requerido")
    .isEmail().withMessage("El email debe ser válido"),
  body("contacto")
    .trim()
    .notEmpty().withMessage("El número de contacto es requerido")
    .isLength({min: 10}).withMessage("El número de contacto debe tener al menos 10 caracteres"),
  body("numero_identificacion")
    .trim()
    .notEmpty().withMessage("El número de identificación es requerido")
    .isLength({min: 6}).withMessage("El número identificación debe tener al menos 6 caracteres"),
  body("paisresidencia")
    .trim()
    .notEmpty().withMessage("El pais de residencia es requerido")
];
