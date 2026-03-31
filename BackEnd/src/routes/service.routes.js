import { Router } from "express";
import {
    getservices,
    getserviceByName,
    createService,
    updateService,
    deleteService
} from '../controllers/service.controller.js';

const router = Router();

router.get('/', getservices);
router.post('/search', getserviceByName);
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;
