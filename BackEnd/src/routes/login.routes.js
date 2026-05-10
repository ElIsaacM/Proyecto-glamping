import Router from "express";
import { login, createLogin, sendVerificationCode } from "../controllers/login.controller.js";

const router = Router();

router.post('/', login);
router.post('/send-verification-code', sendVerificationCode);
router.post('/create', createLogin);

export default router;

