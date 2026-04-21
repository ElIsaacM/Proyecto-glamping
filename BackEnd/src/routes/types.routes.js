import { Router } from "express";
import { getRoles } from "../controllers/types.controller.js";

const router = Router();

router.get("/roles", getRoles);

export default router;
