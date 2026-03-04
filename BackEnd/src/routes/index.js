import { Router } from "express";
const router = Router();

import productRouter from './product.routes.js';
<<<<<<< HEAD
import { testDB } from "./testDB.controller.js";

router.use('/products', productRouter);
router.get('/test-db', testDB);
=======
import cabinRouter from './cabin.routes.js';

router.use('/products', productRouter);
router.use('/cabins', cabinRouter);
>>>>>>> 7ccb4e3 (commit 2: conexion fetch en el front y conexion a postgres en el back)

export default router