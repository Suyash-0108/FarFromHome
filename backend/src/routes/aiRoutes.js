import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
  analyzeText,
  imageAnalyze,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/analyze", analyzeText);

router.post(
  "/image-analyze",
  upload.single("image"),
  imageAnalyze
);

export default router;