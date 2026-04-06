import { Router } from "express";
import {
    getreservations,
    getreservationByClient,
    
    activateReservation,
    getReservationStats,
    reservationFilters
} from '../controllers/reservation.controller.js';

const router = Router();

router.get('/', getreservations);
router.post('/search', getreservationByClient);

router.put('/activate/:id', activateReservation);
router.get('/stats', getReservationStats);
router.get('/filters', reservationFilters);

export default router;
