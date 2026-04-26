import { Router } from "express";
import { 
  getPayments, 
  getPaymentByInvoice,
  createPaymentManually, 
  PaymentFilters, 
  getPaymentStats 
} from '../controllers/payment.controller.js';

import { validateRules } from "../middleware/validate.middleware.js";
import {
  rulesCreatePaymentManually,
  rulesCreatePaymentByApi
} from '../validators/payment.rules.js'

const router = Router();

router.get('/', getPayments);
router.post('/search', getPaymentByInvoice);
router.post('/', rulesCreatePaymentManually, validateRules, createPaymentManually);
router.get('/filters', PaymentFilters);
router.get('/stats', getPaymentStats);

export default router;
