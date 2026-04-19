import {body, param} from 'express-validator';

export const rulesCreateProduct = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre es requerido")
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),
  body("tipo")
    .trim()
    .notEmpty().withMessage("El tipo es requerido"),
  body("precio")
    .trim()
    .notEmpty().withMessage("El precio es requerido")
    .isNumeric().withMessage("El precio debe ser un numero"),
];

export const rulesUpdateProduct = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre es requerido")
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),
  body("tipo")
    .trim()
    .notEmpty().withMessage("El tipo es requerido"),
  body("precio")
    .trim()
    .notEmpty().withMessage("El precio es requerido")
    .isNumeric().withMessage("El precio debe ser un numero"),
];