import { Router } from "express";
import {
    getCustomerData,
    createCustomer
} from '../controllers/client.controller.js';

const router = Router();

router.get('/', getCustomerData);
router.post('/', createCustomer);

export default router;
