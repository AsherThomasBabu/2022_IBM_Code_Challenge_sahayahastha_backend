import expressAsyncHandler from "express-async-handler";
import otpGenerator from "otp-generator";
import otpModel from "../models/otp.model";

import { Request } from "express";
import { sign } from "jsonwebtoken";
import { UserModel } from "../models";
import { SendOTPType, VerifyOTPType } from "../types";

const ftsms = require("fast-two-sms"); // no types provided by the package

export const sendOTP = expressAsyncHandler(
  async (req: Request<SendOTPType>, res) => {
    if (!req.body.phone) {
      res.status(400).send("otp is required");
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false
    });

    const options = {
      authorization: process.env.OTP_AUTH_KEY,
      message: `Your OTP is: ${otp}`,
      numbers: [req.body.phone]
    };

    ftsms
      .sendMessage(options)
      .then((rep: any) => console.log(rep))
      .catch((err: any) =>
        res.status(500).send({ message: "Error in sending otp" })
      );

    await otpModel.create({ phone: req.body.phone, otp: otp });
    res.status(200);
    res.send({"message": "OTP successfully send"})
  }
);

export const verifyOTP = expressAsyncHandler(
  async (req: Request<VerifyOTPType>, res) => {
    if (!req.body.otp || !req.body.phone) {
      res.status(400).send({ message: "Both otp and phone is required" });
    }

    const otp = await otpModel.find({
      phone: req.body.phone,
      otp: req.body.otp
    });
    if (!otp) {
      res.status(400).send({ message: "OTP is not correct" });
    }

    const user = await UserModel.findOne({ phone: req.body.phone });

    if (!user) {
      res.status(200).send({ existing: false });
    } else {
      const token = sign(''+user._id, process.env.JWT_SECRET!);
      res.status(200).send({ existing: true, token, ...user });
    }
  }
);
