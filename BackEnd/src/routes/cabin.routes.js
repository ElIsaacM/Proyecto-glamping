import { Router } from "express";

import {
  getCabins,
  getCabinByName,
  updateCabin,
  deleteCabin,
  createCabin,
  getCabinStats,
  activateCabin,
} from '../controllers/cabin.controller.js';

import { validateRules } from "../middleware/validate.middleware.js";
import {
  rulesCreateCabin,
  rulesUpdateCabin
} from '../validators/cabin.rules.js';

const router = Router();

router.get('/', getCabins);
router.post('/search', getCabinByName);
router.post('/', rulesCreateCabin, validateRules, createCabin);
router.put('/:id', rulesUpdateCabin, validateRules, updateCabin);
router.delete('/delete/:id', deleteCabin);
router.put('/activate/:id', activateCabin);
router.get('/stats', getCabinStats);

export default router;