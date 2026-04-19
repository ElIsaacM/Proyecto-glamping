import { Router } from "express";
import { getRefunds } from "../controllers/refund.controller.js";

const router = Router();

router.get("/", getRefunds);

export default router;