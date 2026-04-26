import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboard.controller.js";
import { getReservationStats } from "../controllers/reservation.controller.js";

const router = Router();

router.get('/', getDashboardStats);
router.get('/graph', getReservationStats);

export default router;