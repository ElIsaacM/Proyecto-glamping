import { Router } from "express";
import { getreservations, getreservationByClient } from '../controllers/reservation.controller.js';

const router = Router();

router.get('/', getreservations);
router.post('/search', getreservationByClient);

export default router;
