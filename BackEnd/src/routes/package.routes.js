import { Router } from "express";
import {
    getPackages,
    getPackageById,
    getPackageByName,
    createPackage,
    updatePackage,
    deletePackage,
    activatePackage,
    getPackageStats,
    packageFilters,
    getPackageProducts,
    getPackageServices
} from '../controllers/package.controller.js';

import { validateRules } from "../middleware/validate.middleware.js";
import {
    rulesCreatePackage,
    rulesUpdatePackage
} from '../validators/package.rules.js'

const router = Router();

router.get('/', getPackages);
router.get('/:id', getPackageById);
router.post('/search', getPackageByName);
router.post('/', rulesCreatePackage, validateRules, createPackage);
router.put('/:id', rulesUpdatePackage, validateRules, updatePackage);
router.delete('/delete/:id', deletePackage);
router.put('/activate/:id', activatePackage);
router.get('/stats', getPackageStats);
router.get('/filters', packageFilters);
router.get('/:id/products', getPackageProducts);
router.get('/:id/services', getPackageServices);

export default router;
