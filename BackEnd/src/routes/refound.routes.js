import { Router } from "express";
import { getRefounds, getRefoundByInvoice, refoundFilters } from "../controllers/refound.controller.js";

const router = Router();

router.get("/", getRefounds);
router.post("/search", getRefoundByInvoice);
router.get("/filters", refoundFilters);

export default router;