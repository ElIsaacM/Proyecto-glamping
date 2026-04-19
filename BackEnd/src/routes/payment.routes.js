import { Router } from "express";
import { 
  getPayments, 
  getPaymentByInvoice,
  createPaymentManually, 
  PaymentFilters, 
  getPaymentStats 
} from '../controllers/payment.controller.js';

import {
  rulesCreatePaymentManually,
  rulesCreatePaymentWithApi
} from '../validators/payment.rules.js'

const router = Router();

router.get('/', getPayments);
router.post('/search', getPaymentByInvoice);
router.post('/', rulesCreatePaymentManually, createPaymentManually);
router.get('/filters', PaymentFilters);
router.get('/stats', getPaymentStats);

export default router;
