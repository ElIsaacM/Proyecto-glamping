import { Router } from "express";

import {
  getCabins,
  updateCabin,
  deleteCabin,
  createCabin,
  getCabinStats
} from '../controllers/cabin.controller.js';

const router = Router();

router.get('/stats', getCabinStats);
router.get('/', getCabins);
router.post('/', createCabin);
router.put('/:id', updateCabin);
router.delete('/delete/:id', deleteCabin);

export default router;