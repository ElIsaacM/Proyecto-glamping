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

import {
    rulesCreateService,
    rulesUpdateService,
    rulesDeleteService,
    rulesActivateService
} from '../validators/services.rules.js'

const router = Router();

router.get('/', getservices);
router.post('/search', getserviceByName);
router.post('/', rulesCreateService, createService);
router.put('/:id', rulesUpdateService, updateService);
router.delete('/delete/:id', rulesDeleteService, deleteService);
router.put('/activate/:id', rulesActivateService, activateService);
router.get('/filters', getServiceFilters);
router.get('/stats', getServiceStats);

export default router;
