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

const router = Router();

router.get('/', getPackages);
router.get('/:id', getPackageById);
router.post('/search', getPackageByName);
router.post('/', createPackage);
router.put('/:id', updatePackage);
router.delete('/delete/:id', deletePackage);
router.put('/activate/:id', activatePackage);
router.get('/stats', getPackageStats);
router.get('/filters', packageFilters);
router.get('/:id/products', getPackageProducts);
router.get('/:id/services', getPackageServices);

export default router;
