import { Router } from 'express';

import productRouter from './product.routes.js';
import cabinRouter from './cabin.routes.js';
import clientRouter from './client.routes.js';
import reservationRouter from './reservation.routes.js';
import paymentRouter from './payment.routes.js';
import packageRouter from './package.routes.js';
import serviceRouter from './service.routes.js';
import userRouter from './user.routes.js';
import invoiceRouter from './invoices.routes.js';

const router = Router();

router.use('/products', productRouter);
router.use('/cabins', cabinRouter);
router.use('/clients', clientRouter);
router.use('/reservations', reservationRouter);
router.use('/payments', paymentRouter);
router.use('/packages', packageRouter);
router.use('/services', serviceRouter);
router.use('/users', userRouter);
router.use('/invoices', invoiceRouter);

export default router;
