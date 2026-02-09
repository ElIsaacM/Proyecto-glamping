import { Router } from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  sellProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/', updateProduct);
router.patch('/', sellProduct);
router.delete('/', deleteProduct);

export default router;