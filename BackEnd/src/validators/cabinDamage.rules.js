import { body, param } from 'express-validator';

export const rulesCreateCabinDamage = [
  body("cabanaid")
    .trim()
    .notEmpty().withMessage("El id es requerido")
    .isNumeric().withMessage("El id debe ser un número"),
  body("descripcion")
    .trim()
    .notEmpty().withMessage("La descripción es requerida")
    .isLength({min: 10}).withMessage("La descripción del daño a la cabaña debe tener al menos 10 caracteres"),
  body("estado")
    .trim()
    .notEmpty().withMessage("El estado es requerido")
    .isLength({min: 3}).withMessage("El estado de la cabaña debe tener al menos 3 caracteres"),
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
    .isLength({min: 3}).withMessage("El nombre del responsable debe tener al menos 3 caracteres"),
];

export const rulesUpdateCabinDamage = [
  body("descripcion")
    .trim()
    .notEmpty().withMessage("La descripción es requerida")
    .isLength({min: 10}).withMessage("La descripción del daño a la cabaña debe tener al menos 10 caracteres"),
  body("estado")
    .trim()
    .notEmpty().withMessage("El estado es requerido")
    .isLength({min: 3}).withMessage("El estado de la cabaña debe tener al menos 3 caracteres"),
  body("fechaarreglo")
    .trim()
    .notEmpty().withMessage("La fecha es requerida")
    .isDate().withMessage("El valor debe ser en formato fecha"),
  body("responsable")
    .trim()
    .notEmpty().withMessage("El responsable es requerido")
    .isLength({min: 3}).withMessage("El nombre del responsable debe tener al menos 3 caracteres"),
  body("cabanaid")
    .trim()
    .notEmpty().withMessage("El id es requerido")
    .isNumeric().withMessage("El id debe ser un número"),
];
