import { Router } from "express";
import {
    getCustomerData,
    getCustomerById,
    createCustomer
} from '../controllers/customer.controller.js';

import { validateRules } from "../middleware/validate.middleware.js";
import { rulesCreateCustomer } from '../validators/customer.rules.js';

const router = Router();

router.get('/', getCustomerData);
router.get('/:id', getCustomerById);
router.post('/', rulesCreateCustomer, validateRules, createCustomer);

export default router;
