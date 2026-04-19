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

import {
  rulesCreateCabin,
  rulesUpdateCabin,
  rulesDeleteCabin,
  rulesActivateCabin
} from '../validators/cabin.rules.js';

const router = Router();

router.get('/stats', getCabinStats);
router.get('/', getCabins);
router.post('/', rulesCreateCabin, createCabin);
router.put('/:id', rulesUpdateCabin, updateCabin);
router.delete('/delete/:id', rulesDeleteCabin, deleteCabin);
router.put('/activate/:id', rulesActivateCabin, activateCabin);
router.get('/stats', getCabinStats);
router.get('/filters', cabinFilters);

export default router;