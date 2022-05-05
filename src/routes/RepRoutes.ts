import { Router } from "express";
import { createRep, getAllReps, verifyRep } from "../controllers";

const router = Router();

router.route("/").get(getAllReps).post(createRep);

router.post("/verify", verifyRep);

export const RepRoutes = router;
