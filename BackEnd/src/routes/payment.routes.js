import { Router } from "express";
import { getPayments, createPaymentManually } from '../controllers/payment.controller.js';

const router = Router();

router.get('/', getPayments);
router.post('/', createPaymentManually);

export default router;
