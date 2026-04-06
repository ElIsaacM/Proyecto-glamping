import { Router } from "express";
import {
    getCabinsDamage,
    getCabinDamageByName,
    createCabinDamage,
    updateCabinDamage
} from '../controllers/cabinDamage.controller.js';

const router = Router();

router.get('/', getCabinsDamage);
router.post('/search', getCabinDamageByName);
router.post('/', createCabinDamage);
router.put('/', updateCabinDamage);

export default router;