import { body, param } from 'express-validator';

export const rulesGetInvoicesByClient = [
  body("name")
    .trim()
    .notEmpty().withMessage("El nombre del cliente es requerido")
    .isLength({min: 3}).withMessage("El nombre del cliente debe tener al menos 3 caracteres")
];