import { Router } from "express";
import { getservices, getserviceById } from '../controllers/service.controller.js';

const router = Router();

router.get('/', getservices);
router.get('/:id', getserviceById);

export default router;
