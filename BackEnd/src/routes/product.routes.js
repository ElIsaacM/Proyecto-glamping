import { Router } from "express";

import {
  getProducts,
  getProductByName,
  createProduct,
  updateProduct,
  sellProduct,
  deleteProduct,
  activateProduct,
  getProductStats,
  productFilters
} from '../controllers/product.controller.js';

const router = Router();

router.get('/', getProducts);
router.post('/search', getProductByName);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.patch('/:id', sellProduct);
router.delete('/delete/:id', deleteProduct);
router.put('/activate/:id', activateProduct);
router.get('/stats', getProductStats);
router.get('/filters', productFilters);

export default router;