import { Router } from "express";

import {
  getCabins
} from '../controllers/cabin.controller.js';

const router = Router();

router.get('/', getCabins);

export default router;