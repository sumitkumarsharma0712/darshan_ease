import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import templeRoutes from "./routes/templeRoutes.js";
import slotRoutes from "./routes/slotRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import { errorHandler } from "./middleware/error.js";

dotenv.config();

const app = express();

// Security & parsing
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    // Allow any localhost origin
    if (/^http:\/\/localhost:\d+$/.test(origin)) {
      return callback(null, true);
    }
    // Allow configured CLIENT_URL
    if (process.env.CLIENT_URL && origin === process.env.CLIENT_URL) {
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));
app.use(express.json({ limit: "1mb" }));

// Logging (skip in test)
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/donations", donationRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use(errorHandler);

export default app;
