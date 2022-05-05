// get notifications
// post notidications

import { Request } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { NotificationModel } from '../models';
import { NotificationType } from '../types';

export const getNotifications = expressAsyncHandler(async (req, res) => {
  const notifications = await NotificationModel.find();

  res.status(200).send(notifications);
});

export const createNotification = expressAsyncHandler(
  async (req: Request<NotificationType>, res) => {
    const { title, message, user, pin } = req.body;
    const notification = await NotificationModel.create({
      title,
      message,
      user,
      pin,
    });

    return notification;
  }
);
