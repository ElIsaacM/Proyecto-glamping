import { Router } from "express";
import {
    getCabinsDamage,
    getCabinDamageByName,
    createCabinDamage,
    updateCabinDamage
} from '../controllers/cabinDamage.controller.js';

import {
    rulesCreateCabinDamage,
    rulesUpdateCabinDamage
} from '../validators/cabinDamage.rules.js'

const router = Router();

router.get('/', getCabinsDamage);
router.post('/search', getCabinDamageByName);
router.post('/', rulesCreateCabinDamage, createCabinDamage);
router.put('/', rulesUpdateCabinDamage, updateCabinDamage);

export default router;