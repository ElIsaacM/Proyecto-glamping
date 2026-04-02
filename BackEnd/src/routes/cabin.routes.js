import { Router } from "express";
import {
  getCabins,
  getCabinByName,
  createCabin,
  updateCabin,
  deleteCabin
} from '../controllers/cabin.controller.js';

const router = Router();

router.get('/', getCabins);
router.post('/search', getCabinByName);
router.post('/', createCabin);
router.put('/:id', updateCabin);
router.delete('/:id', deleteCabin);

export default router;
