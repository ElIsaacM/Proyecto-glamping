import { body, param } from 'express-validator';

export const rulesCreatePackage = [
  body("tipo_id")
    .trim()
    .notEmpty().withMessage("El id de tipo de paquete es requerido"),
  body("registrado_por_id")
    .trim()
    .notEmpty().withMessage("El id del encargado de registrar es requerido")
    .isNumeric().withMessage("El id debe ser un número"),
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre es requerido"),
  body("dias_estadia")
    .trim()
    .notEmpty().withMessage("Los dias de estadia son requeridos")
    .isNumeric().withMessage("Los dias deben ser valores numéricos")
];

export const rulesUpdatePackage = [
  body("tipo_id")
    .trim()
    .notEmpty().withMessage("El id de tipo de paquete es requerido"),
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre del paquete es requerido"),
  body("dias_estadia")
    .trim()
    .notEmpty().withMessage("Los dias de estadia son requeridos")
    .isNumeric().withMessage("Los dias deben ser valores numéricos"),
  param("id")
    .trim()
    .notEmpty().withMessage("El id del paquete es requerido")
];

export const rulesDeletePackage = [
  param("id")
    .trim()
    .notEmpty().withMessage("El id del paquete es requerido")
];

export const rulesActivatePackage = [
  param("id")
    .trim()
    .notEmpty().withMessage("El id del paquete es requerido")
];