import { Router } from "express";

import {
  getCabins,
  updateCabin,
  deleteCabin,
  createCabin,
  getCabinStats,
  activateCabin,
  cabinFilters
} from '../controllers/cabin.controller.js';

import { validateRules } from "../middleware/validate.middleware.js";
import {
  rulesCreateCabin,
  rulesUpdateCabin
} from '../validators/cabin.rules.js';

const router = Router();

router.get('/stats', getCabinStats);
router.get('/', getCabins);
router.post('/', rulesCreateCabin, validateRules, createCabin);
router.put('/:id', rulesUpdateCabin, validateRules, updateCabin);
router.delete('/delete/:id', deleteCabin);
router.put('/activate/:id', activateCabin);
router.get('/stats', getCabinStats);
router.get('/filters', cabinFilters);

export default router;