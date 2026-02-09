import { Router } from "express";
const router = Router();

import productRouter from './product.routes.js';
import { testDB } from "./testDB.controller.js";

router.use('/products', productRouter);
router.get('/test-db', testDB);

export default router