import expressAsyncHandler from "express-async-handler";

import { Request } from "express";
import { sign } from "jsonwebtoken";
import { UserModel } from "../models";
import { RegisterUserType } from "../types";

/**
 *
 * @description creating a user
 * @public
 */
export const createUser = expressAsyncHandler(
  async (req: Request<RegisterUserType>, res) => {
    const { name, phone, house_name, city, district, pin_code } = req.body;
    if (!name || !phone || !house_name || !city || !district || !pin_code) {
      res.status(400).send("All data not provided");
    }

    // TODO: save the details to the database
    const user = await UserModel.create({
      name,
      phone,
      house_name,
      city,
      district,
      pin_code
    });
    const token = sign(''+user._id, process.env.JWT_SECRET!);
    res.status(200).json({ token, ...user });
  }
);

/**
 * @route /user/:id
 * @description getting a user from an id
 * @private
 */
export const getUserById = expressAsyncHandler(async (req, res) => {
  //TODO:get data from the database
  const { id } = req.query;

  const user = await UserModel.findById(id);

  if (!user) {
    res.send(400).send("Invalid user id");
  }

  res.status(200).send(user);
});
