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

import { validateRules } from "../middleware/validate.middleware.js";
import {
  rulesCreateProduct,
  rulesUpdateProduct,
} from '../validators/product.rules.js'

const router = Router();

router.get('/', getProducts);
router.post('/search', getProductByName);
router.post('/', rulesCreateProduct, validateRules, createProduct);
router.put('/:id', rulesUpdateProduct, validateRules, updateProduct);
router.delete('/delete/:id', deleteProduct);
router.put('/activate/:id', activateProduct);
router.get('/stats', getProductStats);
router.get('/filters', productFilters);

export default router;