import {body, param} from 'express-validator';

export const rulesCreateRefound = [
  body("factura_id")
    .trim()
    .notEmpty().withMessage("El id de la factura es requerido"),
  body("motivo")
    .trim()
    .notEmpty().withMessage("El motivo del reembolso es requerido")
    .isLength({min: 10}).withMessage("El motivo del reembolso debe tener al menos 10 caracteres"),
  body("monto")
    .trim()
    .notEmpty().withMessage("El monto es requerido")
    .isNumeric().withMessage("El monto debe ser un número")
];

export const rulesUpdateRefound = [
  body("estado")
    .trim()
    .notEmpty().withMessage("El estado de la factura es requerida"),
  body("factura_id")
    .trim()
    .notEmpty().withMessage("El id de la factura es requerido")
];