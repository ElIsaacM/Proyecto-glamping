import { Router } from "express";
import {
    getCustomerData,
    getCustomerById,
    createCustomer
} from '../controllers/customer.controller.js';

const router = Router();

router.get('/', getCustomerData);
router.get('/:id', getCustomerById);
router.post('/', createCustomer);

export default router;
