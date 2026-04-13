import { Router } from "express";

import {
  getProducts,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';

const router = Router();

router.get('/', getProducts);
router.post('/search', getProductByName);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

export default router;