import expressAsyncHandler from "express-async-handler";
import { genSalt, hash, compare } from "bcryptjs";
import { RepModel } from "../models";

export const getAllReps = expressAsyncHandler(async (req, res) => {
  const reps = RepModel.find();

  res.status(200).send(reps);
});

export const createRep = expressAsyncHandler(async (req, res) => {
  const { username, password, name, phone } = req.body;
  if (!username || !password || !name || !phone) {
    res.status(400).send({ message: "All the fields where not provided" });
  }
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  const rep = RepModel.create({
    username,
    password: hashedPassword,
    name,
    phone
  });
  if (!rep) {
    res.status(400).send("Error in creating a representatives");
  }

  res.status(200).send(rep);
});

export const verifyRep = expressAsyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const rep = await RepModel.findOne({ username });

  if (rep && compare(password, rep.password)) {
    res.status(200).send(rep);
  }
  res.status(400);
});
