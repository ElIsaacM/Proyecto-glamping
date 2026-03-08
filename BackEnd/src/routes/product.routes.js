import { Router } from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  sellProduct,
  deleteProduct
} from '../controllers/product.controller.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.patch('/:id', sellProduct);
router.delete('/:id', deleteProduct);

export default router;