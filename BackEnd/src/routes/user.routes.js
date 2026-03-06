import { Router } from "express";
import { getusers, getuserById } from '../controllers/user.controller.js';

const router = Router();

router.get('/', getusers);
router.get('/:id', getuserById);

export default router;
