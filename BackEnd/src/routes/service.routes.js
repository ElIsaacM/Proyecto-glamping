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

const router = Router();

router.get('/', getservices);
router.post('/search', getserviceByName);
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/delete/:id', deleteService);
router.put('/activate/:id', activateService);
router.get('/filters', getServiceFilters);
router.get('/stats', getServiceStats);

export default router;
