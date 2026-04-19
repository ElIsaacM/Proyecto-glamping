import { Router } from "express";
import {
    getPackages,
    getPackageByName,
    createPackage,
    updatePackage,
    deletePackage,
    activatePackage,
    getPackageStats,
    packageFilters
} from '../controllers/package.controller.js';

import {
    rulesCreatePackage,
    rulesUpdatePackage,
    rulesDeletePackage,
    rulesActivatePackage
} from '../validators/package.rules.js'

const router = Router();

router.get('/', getPackages);
router.post('/search', getPackageByName);
router.post('/', rulesCreatePackage, createPackage);
router.put('/:id', rulesUpdatePackage, updatePackage);
router.delete('/delete/:id', rulesDeletePackage, deletePackage);
router.put('/activate/:id', rulesActivatePackage, activatePackage);
router.get('/stats', getPackageStats);
router.get('/filters', packageFilters);

export default router;
