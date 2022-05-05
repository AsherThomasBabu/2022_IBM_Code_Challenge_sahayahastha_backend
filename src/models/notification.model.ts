import mongoose from 'mongoose';

const notification = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  user: { type: String, required: true },
  pin: { type: String, required: true },
});

export const NotificationModel = mongoose.model('notification', notification);
