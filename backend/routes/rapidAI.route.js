import Router from "express";
import { rapidAIController } from "../controllers/rapidAI.controller.js";

const router = Router();

router.post("/execute", rapidAIController);

export default router;