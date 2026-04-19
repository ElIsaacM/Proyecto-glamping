import Router from "express";
import { login, createLogin } from "../controllers/login.controller.js";

const router = Router();

router.post('/', login);
router.post('/create', createLogin);

export default router;

