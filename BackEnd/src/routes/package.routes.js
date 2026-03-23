import { Router } from "express";

import {
    getPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage
} from '../controllers/package.controller.js';

const router = Router();

router.get('/', getPackages);
router.get('/:id', getPackageById);
router.post('/', createPackage);
router.put('/:id', updatePackage);
router.delete('/:id', deletePackage);

export default router;
