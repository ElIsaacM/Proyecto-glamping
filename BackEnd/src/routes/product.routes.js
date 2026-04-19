import { Router } from "express";

import {
  getProducts,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct,
  activateProduct,
  getProductStats,
  productFilters
} from '../controllers/product.controller.js';

import {
  rulesCreateProduct,
  rulesUpdateProduct,
  rulesDeleteProduct,
  rulesActivateProduct
} from '../validators/product.rules.js'

const router = Router();

router.get('/', getProducts);
router.post('/search', getProductByName);
router.post('/', rulesCreateProduct, createProduct);
router.put('/:id', rulesUpdateProduct, updateProduct);
router.delete('/delete/:id', rulesDeleteProduct, deleteProduct);
router.put('/activate/:id', rulesActivateProduct, activateProduct);
router.get('/stats', getProductStats);
router.get('/filters', productFilters);

export default router;