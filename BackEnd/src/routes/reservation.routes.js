import { Router } from "express";
import {
    getreservations,
    getReservationByInvoice,
    activateReservation,
    cancelReservation,
    reservationFilters,
    getReservationStats
} from '../controllers/reservation.controller.js';

const router = Router();

router.get('/', getreservations);
router.post('/search', getReservationByInvoice);
router.put('/activate/:id', activateReservation);
router.put('/delete/:id', cancelReservation);
router.get('/filters', reservationFilters);
router.get('/stats', getReservationStats);

export default router;
