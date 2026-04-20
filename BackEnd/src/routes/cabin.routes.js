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

const router = Router();

router.get('/', getCabins);
router.post('/search', getCabinByName);
router.post('/', createCabin);
router.put('/:id', updateCabin);
router.delete('/delete/:id', deleteCabin);
router.put('/activate/:id', activateCabin);
router.get('/stats', getCabinStats);

export default router;