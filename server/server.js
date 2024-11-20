import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(helmet());
app.use(morgan("combined"));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);

// API Routes
app.use("/api", authRoutes);

// Serve static files from the Vite build directory
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Serve React routes (fallback) correctly
app.get('*', (req, res, next) => {
  const acceptHeader = req.headers.accept || '';
  
  // Check if the request is for an HTML document
  if (acceptHeader.includes('text/html')) {
    res.sendFile(path.join(distPath, 'index.html'));
  } else {
    next(); // Pass other requests (like JS, CSS, etc.) to Express static middleware
  }
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

export default app;
