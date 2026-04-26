import { Router } from "express";
import {
  getNotifications,
  getLastNotifications,
  deleteNotification,
  deleteAllNotifications,
} from "../controllers/notification.controller.js";

const router = Router();

router.get("/", getNotifications);
router.get("/last", getLastNotifications);
router.delete("/all", deleteAllNotifications);
router.delete("/:notificacion_id", deleteNotification);

export default router;