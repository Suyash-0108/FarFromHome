import express from "express";
import {
  getDashboardStats,
  getCategories,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/stats", getDashboardStats);
router.get("/categories", getCategories);

export default router;