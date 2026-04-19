import { body, param } from 'express-validator';

export const rulesCreateProduct = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre del producto es requerido"),
  body("tipo")
    .trim()
    .notEmpty().withMessage("El tipo de producto es requerido"),
  body("precio")
    .trim()
    .notEmpty().withMessage("El precio del producto es requerido")
    .isNumeric().withMessage("El precio del producto debe ser un número"),
];

export const rulesUpdateProduct = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre del producto es requerido"),
  body("tipo")
    .trim()
    .notEmpty().withMessage("El tipo de producto es requerido"),
  body("precio")
    .trim()
    .notEmpty().withMessage("El precio del producto es requerido")
    .isNumeric().withMessage("El precio del producto debe ser un número"),
  param("id")
    .trim()
    .notEmpty().withMessage("El id del producto es requerido")
    .isNumeric().withMessage("El id del producto debe ser un número")
];

export const rulesDeleteProduct = [
  param("id")
    .trim()
    .notEmpty().withMessage("El id del producto es requerido")
    .isNumeric().withMessage("El id del producto debe ser un número")
];

export const rulesActivateProduct = [
  param("id")
    .trim()
    .notEmpty().withMessage("El id del producto es requerido")
    .isNumeric().withMessage("El id del producto debe ser un número")
];