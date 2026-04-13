import { Router } from "express";
import { getRoles, getIdentificaciones } from "../controllers/types.controller.js";

const router = Router();

router.get("/roles", getRoles);
router.get("/identificaciones", getIdentificaciones);

export default router;
