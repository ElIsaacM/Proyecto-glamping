import { Router } from "express";
import {
    getCabinsDamage,
    getCabinDamageByName,
    createCabinDamage,
    updateCabinDamage
} from '../controllers/cabinDamage.controller.js';

import { validateRules } from "../middleware/validate.middleware.js";
import {
    rulesCreateCabinDamage,
    rulesUpdateCabinDamage
} from '../validators/cabinDamage.rules.js'

const router = Router();

router.get('/', getCabinsDamage);
router.post('/search', getCabinDamageByName);
router.post('/', rulesCreateCabinDamage, validateRules, createCabinDamage);
router.put('/', rulesUpdateCabinDamage, validateRules, updateCabinDamage);

export default router;