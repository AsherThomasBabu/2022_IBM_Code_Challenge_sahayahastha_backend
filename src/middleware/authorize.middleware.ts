import expressAsyncHandler from "express-async-handler";

import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../models";

export const authorize = expressAsyncHandler(
  async (
    req: Request<Record<any, any> | { role: "rep" | "user"; token: string }>,
    res,
    next
  ) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        // Get user from the token
        await UserModel.findById((decoded as JwtPayload).id);

        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not authorized");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);
