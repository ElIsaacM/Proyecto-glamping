import { body, param } from 'express-validator';

export const rulesGetInvoicesByClient = [
  param("id")
    .trim()
    .notEmpty().withMessage("El id es requerido")
    .isNumeric().withMessage("El id debe ser un número")
];

export const rulesCreateInvoice = [];

export const rulesUpdateInvoiceByPackage = [
  body("subtotal")
    .trim()
    .notEmpty().withMessage("El subtotal es requerido")
    .isNumeric().withMessage("El subtotal debe ser un número"),
  body("reserva_id")
    .trim()
    .notEmpty().withMessage("El id de la reserva es requerido")
    .isNumeric().withMessage("El id de la reserva debe ser un número")
];