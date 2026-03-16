import { Router } from "express";

import {
    getpackages,
    getpackageById,
    createPackage,
    updatePackage,
    deletePackage
} from '../controllers/package.controller.js';

const router = Router();

router.get('/', getpackages);
router.get('/:id', getpackageById);
router.post('/', createPackage);
router.put('/:id', updatePackage);
router.delete('/:id', deletePackage);

export default router;
