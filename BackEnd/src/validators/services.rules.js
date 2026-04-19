import { body, param } from 'express-validator';

export const rulesCreateService = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre del servicio es requerido"),
  body("encargado")
    .trim()
    .notEmpty().withMessage("El nombre del encargado es requerido"),
  body("duracion_minutos")
    .trim()
    .notEmpty().withMessage("La duración en minutos es requerida")
    .isNumeric().withMessage("La duración en minutos debe ser un número"),
  body("precio")
    .trim()
    .notEmpty().withMessage("El precio del servicio es requerido")
    .isNumeric().withMessage("La precio del servicio debe ser un número"),
];

export const rulesUpdateService = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre del servicio es requerido"),
  body("encargado")
    .trim()
    .notEmpty().withMessage("El nombre del encargado es requerido"),
  body("duracion_minutos")
    .trim()
    .notEmpty().withMessage("La duración en minutos es requerida")
    .isNumeric().withMessage("La duración en minutos debe ser un número"),
  body("precio")
    .trim()
    .notEmpty().withMessage("El precio del servicio es requerido")
    .isNumeric().withMessage("La precio del servicio debe ser un número"),
  param("id")
    .trim()
    .notEmpty().withMessage("El id del servicio es requerido")
    .isNumeric().withMessage("El id del servicio debe ser un número")
];

export const rulesDeleteService = [
  param("id")
    .trim()
    .notEmpty().withMessage("El id del servicio es requerido")
    .isNumeric().withMessage("El id del servicio debe ser un número")
];

export const rulesActivateService = [
  param("id")
    .trim()
    .notEmpty().withMessage("El id del servicio es requerido")
    .isNumeric().withMessage("El id del servicio debe ser un número")
];
