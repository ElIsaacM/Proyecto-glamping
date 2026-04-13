import { Router } from 'express';

import productRouter from './product.routes.js';
import cabinRouter from './cabin.routes.js';
import cabinDamageRouter from './cabinDamage.routes.js';
import clientRouter from './client.routes.js';
import reservationRouter from './reservation.routes.js';
import paymentRouter from './payment.routes.js';
import packageRouter from './package.routes.js';
import serviceRouter from './service.routes.js';
import userRouter from './user.routes.js';
import typesRouter from './types.routes.js';
import refoundRouter from './refound.routes.js';
import invoiceRouter from './invoice.routes.js';

const router = Router();

router.use('/products', productRouter);
router.use('/cabins', cabinRouter);
router.use('/cabinDamage', cabinDamageRouter);
router.use('/clients', clientRouter);
router.use('/reservations', reservationRouter);
router.use('/payments', paymentRouter);
router.use('/packages', packageRouter);
router.use('/services', serviceRouter);
router.use('/users', userRouter);
router.use('/refounds', refoundRouter);
router.use('/invoices', invoiceRouter);

router.use('/types', typesRouter);

export default router;
