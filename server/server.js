import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(helmet()); // Secure HTTP headers
app.use(cors()); // Enable CORS
app.use(morgan("combined")); // Log HTTP requests

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter); // Apply rate limiting to /api routes

// API Routes
app.use("/api", authRoutes);

// Protected Test Route (Authenticated Only)
app.get("/api/protected", authMiddleware, function (req, res) {
  res.status(200).json({ message: "You have access to this protected route." });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function () {
    console.log("Connected to MongoDB");
  })
  .catch(function (err) {
    console.error("MongoDB connection error:", err);
  });

export default app;
