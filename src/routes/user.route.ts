import { Router } from "express";
import { createUser, getUserById } from "../controllers";
import { authorize } from "../middleware";

const router = Router();

router.post("/", createUser);
router.get("/:id", authorize, getUserById);

export const UserRouter = router;
