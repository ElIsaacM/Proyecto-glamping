import { Router } from "express";
import { getclients, getclientById } from '../controllers/client.controller.js';

const router = Router();

router.get('/', getclients);
router.get('/:id', getclientById);

export default router;
