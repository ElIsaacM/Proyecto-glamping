import { Router } from "express";
import {
    getReservations,
    getReservationByClient,
    updateReservationByPayment,
    deleteReservation,
    activateReservation,
    getReservationStats,
    reservationFilters,
} from '../controllers/reservation.controller.js';

import {
    rulesCreateReservation,
    rulesUpdateReservation,
    rulesUpdateReservationByPayment,
    rulesDeleteReservation
} from '../validators/reservation.rules.js'

const router = Router();

router.get('/', getReservations);
router.post('/search', getReservationByClient);
router.put('/', rulesUpdateReservationByPayment, updateReservationByPayment)
router.delete('/delete/:id', rulesDeleteReservation, deleteReservation)
router.put('/activate/:id', activateReservation);
router.get('/stats', getReservationStats);
router.get('/filters', reservationFilters);

export default router;
