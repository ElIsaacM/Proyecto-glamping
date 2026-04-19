import { Router } from 'express';
import {
    getInvoices,
    getInvoicesByClient,
    updateInvoiceByPackage
} from '../controllers/invoices.controller.js';

import {
    rulesGetInvoicesByClient,
    rulesCreateInvoice,
    rulesUpdateInvoiceByPackage
} from '../validators/invoices.rules.js';

const router = Router();

router.get('/', getInvoices);
router.get('/:id', rulesGetInvoicesByClient, getInvoicesByClient);
router.put('/', rulesUpdateInvoiceByPackage, updateInvoiceByPackage)

export default router;