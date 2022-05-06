import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { OTPRouter, RepRouter, UserRouter } from "./routes";

require("dotenv").config(); // setting env

const app = express();

app.use(
  cors({
    origin: "*"
  })
);
app.use(express.json()); // for parsing request body

app.use("/api/v1/otp", OTPRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/rep", RepRouter);

process.on('SIGINT|SIGKILL|exit', () => {
  console.log(`Application is exited with status code`)
  mongoose.disconnect()
})

app.listen(process.env.PORT || 3000, () => {
  mongoose
    .connect(process.env.MONGO_URI!)
    .then((res) => {
      console.log("db connected");
      console.log(
        `App listening on https://localhost:${process.env.PORT || 3000}`
      );
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
});
