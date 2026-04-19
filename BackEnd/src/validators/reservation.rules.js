import { body, param } from 'express-validator';

export const rulesCreateReservation = [];

export const rulesUpdateReservation = [];

export const rulesUpdateReservationByPayment = [
  body("reserva_id")
    .trim()
    .notEmpty().withMessage("El id de la reserva es requerido")
    .isNumeric().withMessage("El id de la reserva debe ser un número")
];

export const rulesDeleteReservation = [
  param("id")
    .trim()
    .notEmpty().withMessage("El id de la reserva es requerido")
    .isNumeric().withMessage("El id de la reserva debe ser un número")
];
