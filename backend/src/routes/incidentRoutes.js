import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { validateIncident }
from "../middleware/validationMiddleware.js";

import {
  createIncident,
  getAllIncidents,
  getIncidentById,
  updateIncidentStatus,
} from "../controllers/incidentController.js";

const router = express.Router();

router.post(
  "/",
  upload.single("image"),
  validateIncident,
  createIncident
);

router.get("/", getAllIncidents);

router.get("/:id", getIncidentById);

router.patch("/:id/status", updateIncidentStatus);

export default router;