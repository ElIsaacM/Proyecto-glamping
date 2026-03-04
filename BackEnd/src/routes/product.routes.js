import { Router } from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  sellProduct,
  deleteProduct
<<<<<<< HEAD
} from '../controllers/productController.js';
=======
} from '../controllers/product.controller.js';
>>>>>>> 7ccb4e3 (commit 2: conexion fetch en el front y conexion a postgres en el back)

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/', updateProduct);
router.patch('/', sellProduct);
router.delete('/', deleteProduct);

export default router;