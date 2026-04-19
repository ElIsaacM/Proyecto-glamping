import { body, param } from 'express-validator';

export const rulesCreateCabin = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre de la cabaña es requerido"),
  body("precio_noche")
    .trim()
    .notEmpty().withMessage("El precio por noche es requerido")
    .isNumeric().withMessage("El precio por noche debe ser un número"),
];

export const rulesUpdateCabin = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre de la cabaña es requerido"),
  body("precio_noche")
    .trim()
    .notEmpty().withMessage("El precio por noche es requerido")
    .isNumeric().withMessage("El precio por noche debe ser un número"),
];

export const rulesDeleteCabin = [
  param("id")
    .trim()
    .notEmpty().withMessage("El id de la cabaña es requerido")
    .isNumeric().withMessage("El id de la cabaña debe ser un número")
];

export const rulesActivateCabin = [
  param("id")
    .trim()
    .notEmpty().withMessage("El id de la cabaña es requerido")
    .isNumeric().withMessage("El id de la cabaña debe ser un número")
];
