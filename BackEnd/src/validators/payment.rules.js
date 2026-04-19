import { body, param } from 'express-validator';

export const rulesCreatePaymentManually = [
  body("factura_id")
    .trim()
    .notEmpty().withMessage("El id de la factura es requerido"),
  body("email")
    .trim()
    .notEmpty().withMessage("El email es requerido")
    .isEmail().withMessage("El email debe ser válido"),
  body("metodo_id")
    .trim()
    .notEmpty().withMessage("El id del método de pago es requerido")
    .isNumeric().withMessage("El id del método de pago debe ser un número"),
  body("total_pagado")
    .trim()
    .notEmpty().withMessage("El total pagado es requerido")
    .isNumeric().withMessage("El total pagado debe ser un número"),
];

export const rulesCreatePaymentWithApi = [
  body("factura_id")
    .trim()
    .notEmpty().withMessage("El id de la factura es requerido"),
  body("fecha_pago")
    .trim()
    .notEmpty().withMessage("La fecha de pago es requerida")
    .isDate().withMessage("El valor debe ser en formato fecha"),
  body("metodo_id")
    .trim()
    .notEmpty().withMessage("El id del método de pago es requerido")
    .isNumeric().withMessage("El id del método de pago debe ser un número"),
  body("total_pagado")
    .trim()
    .notEmpty().withMessage("El total pagado es requerido")
    .isNumeric().withMessage("El total pagado debe ser un número"),
]