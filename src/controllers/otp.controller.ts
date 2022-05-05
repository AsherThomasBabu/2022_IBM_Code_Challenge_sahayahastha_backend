import { Request } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { SendOTPType, VerifyOTPType } from '../types';

export const sendOTP = expressAsyncHandler(
  async (req: Request<SendOTPType>, res) => {
    if (!req.body.phone) {
      res.status(400).send('otp is required');
    }
    // TODO: handle phone number and send otp
  }
);

export const verifyOTP = expressAsyncHandler(
  async (req: Request<VerifyOTPType>, res) => {
    if (!req.body.otp || !req.body.phone) {
      res.status(400).send('Both otp and phone is required');
    }
    // TODO: check if both are correct then generate access token and send back
  }
);
