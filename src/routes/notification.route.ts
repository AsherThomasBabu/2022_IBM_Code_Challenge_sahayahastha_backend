import { Router } from "express";

import { createNotification, getNotifications } from "../controllers";
import { authorize } from "../middleware";

const router = Router();

router
  .route("/")
  .get(authorize, getNotifications)
  .post(authorize, createNotification);

export const NotificationRouter = router;