import {body, param} from 'express-validator';

export const rulesCreatePaymentManually = [
  body("factura_id")
    .trim()
    .notEmpty().withMessage("El id de la factura es requerido"),
  body("metodo_id")
    .trim()
    .notEmpty().withMessage("El id del metodo de pago es requerido")
    .isNumeric().withMessage("El id del metodo de pago debe ser un numero"),
  body("total_pagado")
    .trim()
    .notEmpty().withMessage("El total pagado es requerido")
    .isNumeric().withMessage("El total pagado debe ser un numero"),
  body("email")
    .trim()
    .notEmpty().withMessage("El email es requerido")
    .isEmail().withMessage("El email debe ser valido"),
];

export const rulesCreatePaymentByApi = [
];
