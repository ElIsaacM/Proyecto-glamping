import { Router } from 'express';
import { getInvoices, getInvoicesByClient } from '../controllers/invoice.controller.js';

const router = Router();

router.get('/', getInvoices);
router.post('/search', getInvoicesByClient);

export default router;