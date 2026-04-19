import { body, param } from 'express-validator';

export const rulesCreateCabinDamage = [
  body("cabanaid")
    .trim()
    .notEmpty().withMessage("El id es requerido")
    .isNumeric().withMessage("El id debe ser un número"),
  body("descripcion")
    .trim()
    .notEmpty().withMessage("La descripción es requerida"),
  body("estado")
    .trim()
    .notEmpty().withMessage("El estado es requerido"),
  body("fechaRegistro")
    .trim()
    .notEmpty().withMessage("La fecha es requerida")
    .isDate().withMessage("El valor debe ser en formato fecha"),
  body("fechaarreglo")
    .trim()
    .notEmpty().withMessage("La fecha es requerida")
    .isDate().withMessage("El valor debe ser en formato fecha"),
  body("responsable")
    .trim()
    .notEmpty().withMessage("El responsable es requerido")
];

export const rulesUpdateCabinDamage = [
  body("descripcion")
    .trim()
    .notEmpty().withMessage("La descripción es requerida"),
  body("estado")
    .trim()
    .notEmpty().withMessage("El estado es requerido"),
  body("fechaarreglo")
    .trim()
    .notEmpty().withMessage("La fecha es requerida")
    .isDate().withMessage("El valor debe ser en formato fecha"),
  body("responsable")
    .trim()
    .notEmpty().withMessage("El responsable es requerido"),
  body("cabanaid")
    .trim()
    .notEmpty().withMessage("El id es requerido")
    .isNumeric().withMessage("El id debe ser un número"),
];
