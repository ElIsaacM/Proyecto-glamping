import { Router } from "express";
import {
    getservices,
    getserviceByName,
    createService,
    updateService,
    deleteService,
    activateService,
    getServiceFilters,
    getServiceStats
} from '../controllers/service.controller.js';

import { validateRules } from "../middleware/validate.middleware.js";
import {
    rulesCreateService,
    rulesUpdateService
} from '../validators/service.rules.js'

const router = Router();

router.get('/', getservices);
router.post('/search', getserviceByName);
router.post('/', rulesCreateService, validateRules, createService);
router.put('/:id', rulesUpdateService, validateRules, updateService);
router.delete('/delete/:id', deleteService);
router.put('/activate/:id', activateService);
router.get('/filters', getServiceFilters);
router.get('/stats', getServiceStats);

export default router;
