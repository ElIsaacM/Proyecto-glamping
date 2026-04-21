import { body, param } from "express-validator";

export const rulesCreateUser = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre es requerido")
    .isLength({ min: 7 }).withMessage("El nombre debe tener al menos 6 caracteres, debes ingresar minimo un nombre y un apellido"),
  body("contacto")
    .trim()
    .notEmpty().withMessage("El contacto es requerido")
    .isLength({ min: 10 }).withMessage("El contacto debe tener al menos 10 caracteres"),
  body("sueldo")
    .notEmpty().withMessage("El sueldo es requerido")
    .isFloat().withMessage("El sueldo debe ser un numero"),
  body("numero_identificacion")
    .trim()
    .notEmpty().withMessage("El numero de identificacion es requerido")
    .isLength({ min: 6 }).withMessage("El numero de identificacion debe tener al menos 7 caracteres"),
  // ----- Opcional, validar tipos y longitud de identificacion, se debe ajustar la DB -----
  // body('tipo_documento').isIn(['CC', 'CE', 'PA', 'PPT']),
  // body('numero_identificacion')
  //   .if(body('tipo_documento').equals('CC'))
  //   .isNumeric().isLength({ min: 6, max: 10 }),
    
  // body('numero_identificacion')
  //   .if(body('tipo_documento').equals('PA'))
  //   .isAlphanumeric().isLength({ min: 6, max: 20 }) // El pasaporte es el "comodín" internacional
];

export const rulesUpdateUser = [
  body("nombre")
    .trim()
    .isLength({ min: 7 }).withMessage("El nombre debe tener al menos 6 caracteres, debes ingresar minimo un nombre y un apellido"),
  body("contacto")
    .trim()
    .isMobilePhone("any").withMessage("El número de contacto no tiene un formato internacional válido"),
  body("sueldo")
    .isNumeric().withMessage("El sueldo debe ser un numero"),
  body("numero_identificacion")
    .trim()
    .isLength({ min: 6 }).withMessage("El numero de identificacion debe tener al menos 6 caracteres")
    .isAlphanumeric().withMessage("El numero de identificacion debe ser alfanumerico"),
];
