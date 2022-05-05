import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { OTPRoutes, UserRouter } from './routes';

require('dotenv').config(); // setting env

const app = express();

app.use(
  cors({
    origin: '*',
  })
);

app.use('/otp', OTPRoutes);
app.use('/user', UserRouter);

app.listen(process.env.PORT || 3000, () => {
  mongoose
    .connect(process.env.MONGO_URI!)
    .then((res) => {
      console.log('db connected');
      console.log(
        `App listening on https://localhost:${process.env.PORT || 3000}`
      );
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
});
