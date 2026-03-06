import { Router } from "express";
import { getreservations, getreservationById } from '../controllers/reservation.controller.js';

const router = Router();

router.get('/', getreservations);
router.get('/:id', getreservationById);

export default router;
