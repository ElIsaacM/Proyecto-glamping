import { Router } from "express";
import { getservices, getserviceByName } from '../controllers/service.controller.js';

const router = Router();

router.get('/', getservices);
router.post('/search', getserviceByName);

export default router;
