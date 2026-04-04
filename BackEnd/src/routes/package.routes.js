import { Router } from "express";
import {
    getPackages,
    getPackageByName,
    createPackage,
    updatePackage,
    deletePackage
} from '../controllers/package.controller.js';

const router = Router();

router.get('/', getPackages);
router.post('/search', getPackageByName);
router.post('/', createPackage);
router.put('/:id', updatePackage);
router.delete('/delete:id', deletePackage);

export default router;
