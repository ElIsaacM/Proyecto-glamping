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

const router = Router();

router.get('/', getPackages);
router.post('/search', getPackageByName);
router.post('/', createPackage);
router.put('/:id', updatePackage);
router.delete('/delete:id', deletePackage);
router.put('/activate/:id', activatePackage);
router.get('/stats', getPackageStats);
router.get('/filters', packageFilters);

export default router;
