import { body, param } from 'express-validator';

export const rulesCreateCabin = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre de la cabaña es requerido")
    .isLength({min: 3}).withMessage("El nombre de la cabaña debe tener al menos 3 caracteres"),
  body("precio_noche")
    .trim()
    .notEmpty().withMessage("El precio por noche es requerido")
    .isNumeric().withMessage("El precio por noche debe ser un número"),
  body("descripcion")
    .trim()
    .notEmpty().withMessage("La descripción es requerida")
];

export const rulesUpdateCabin = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre de la cabaña es requerido")
    .isLength({min: 3}).withMessage("El nombre de la cabaña debe tener al menos 3 caracteres"),
  body("precio_noche")
    .trim()
    .notEmpty().withMessage("El precio por noche es requerido")
    .isNumeric().withMessage("El precio por noche debe ser un número"),
  body("descripcion")
    .trim()
    .notEmpty().withMessage("La descripción es requerida")
];
