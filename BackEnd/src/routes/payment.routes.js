import { Router } from "express";
import { getpayments, getpaymentById } from '../controllers/payment.controller.js';

const router = Router();

router.get('/', getpayments);
router.get('/:id', getpaymentById);

export default router;
