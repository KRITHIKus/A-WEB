import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Import DB connection
import responseRoutes from "./routes/responseRoutes.js";

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB().catch((err) => {
  console.error("MongoDB Connection Error:", err);
  process.exit(1); // Exit if DB fails to connect
});

// CORS Configuration - Allow requests from your frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // ✅ Use env variable
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json()); // Middleware to parse JSON

// Routes
app.use("/response", responseRoutes); // Use the response routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
