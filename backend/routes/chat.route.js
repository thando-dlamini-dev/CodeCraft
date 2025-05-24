import { Router } from "express";
import chatController from "../controllers/chat.controller.js";

const router = Router();

router.post("/run", chatController)

export default router;