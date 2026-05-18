import { Router } from "express";

import {
  getCabins,
  getCabinByName,
  updateCabin,
  deleteCabin,
  createCabin,
  getCabinStats,
  activateCabin,
  getCabinFilters,
} from '../controllers/cabin.controller.js';

import { validateRules } from "../middleware/validate.middleware.js";
import {
  rulesCreateCabin,
  rulesUpdateCabin
} from '../validators/cabin.rules.js';

import upload from '../services/multer.service.js';

const router = Router();

router.get('/', getCabins);
router.get('/filters', getCabinFilters);
router.post('/search', getCabinByName);
router.post('/', upload.array('imagenes'), rulesCreateCabin, validateRules, createCabin);
router.put('/:id', upload.array('imagenes'), rulesUpdateCabin, validateRules, updateCabin);
router.delete('/delete/:id', deleteCabin);
router.put('/activate/:id', activateCabin);
router.get('/stats', getCabinStats);

import { addImagesToCabin, getCabinImages, deleteCabinImage } from '../controllers/cabin.controller.js';
router.get('/:id/images', getCabinImages);
router.post('/:id/images', upload.array('imagenes'), addImagesToCabin);
router.delete('/images/:imgId', deleteCabinImage);

export default router;