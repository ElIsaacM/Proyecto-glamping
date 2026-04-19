import { Router } from "express";
import {
    getCustomerData,
    createCustomer
} from '../controllers/client.controller.js';

import {
    rulesCreateCustomer
} from '../validators/customer.rules.js';

const router = Router();

router.get('/', getCustomerData);
router.post('/', rulesCreateCustomer, createCustomer);

export default router;
