import Router from "express";
import { pdfScanController } from "../controllers/pdfScan.controller.js";
const router = Router();
router.post("/scan", pdfScanController);

export default router;