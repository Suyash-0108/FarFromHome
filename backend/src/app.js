import express from "express";
import cors from "cors";
import helmet from "helmet";

import aiRoutes from "./routes/aiRoutes.js";
import incidentRoutes from "./routes/incidentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SentinelAI API Running",
  });
});

// Routes
app.use("/api/incidents", incidentRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Error Handler (keep this last)
app.use(errorHandler);

export default app;