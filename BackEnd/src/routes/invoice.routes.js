import { Router } from "express";
import { getInvoices } from "../controllers/invoice.controller.js";

const router = Router();

router.get("/", getInvoices);

export default router;