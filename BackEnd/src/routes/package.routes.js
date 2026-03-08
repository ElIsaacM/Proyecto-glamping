import { Router } from "express";
import { getpackages, getpackageById } from '../controllers/package.controller.js';

const router = Router();

router.get('/', getpackages);
router.get('/:id', getpackageById);

export default router;
