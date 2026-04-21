import { Router } from 'express';
import { getInvoices, getInvoicesByClient } from '../controllers/invoice.controller.js';

import { validateRules } from "../middleware/validate.middleware.js";
import { rulesGetInvoicesByClient } from '../validators/invoice.rules.js'

const router = Router();

router.get('/', getInvoices);
router.post('/search', rulesGetInvoicesByClient, validateRules, getInvoicesByClient);

export default router;