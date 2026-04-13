import { Router } from "express";
import { getRefounds } from "../controllers/refound.controller.js";

const router = Router();

router.get("/", getRefounds);

export default router;