import {body, param} from 'express-validator';

export const rulesCreatePackage = [
  body("tipo_id")
    .trim()
    .notEmpty().withMessage("El id del tipo es requerido")
    .isNumeric().withMessage("El id del tipo debe ser un numero"),
  body("registrado_por_id")
    .trim()
    .notEmpty().withMessage("El id del usuario es requerido")
    .isNumeric().withMessage("El id del usuario debe ser un numero"),
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre es requerido")
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),
  body("dias_estadia")
    .trim()
    .notEmpty().withMessage("Los dias de estadia son requeridos")
    .isNumeric().withMessage("Los dias de estadia deben ser un numero"),
  body("descripcion")
    .trim()
    .notEmpty().withMessage("La descripcion es requerida")
    .isLength({ min: 10 }).withMessage("La descripcion debe tener al menos 10 caracteres"),
];