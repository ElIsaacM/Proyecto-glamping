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
router.delete("/:id", deleteNotification);
router.delete("/all", deleteAllNotifications);

export default router;