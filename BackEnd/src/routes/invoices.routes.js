import { Router } from 'express';
import { getInvoices, getInvoicesByID } from '../controllers/invoices.controller.js';

const router = Router();

router.get('/', getInvoices);
router.get('/:id', getInvoicesByID);

export default router;