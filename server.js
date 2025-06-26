import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// Start server after DB connects
connectDB().then(() => {
  app.get("/", (req, res) => {
    res.send("🔥 Backend is running...");
  });
  app.listen(process.env.PORT || 5000, () => {
    console.log(
      `🚀 Server running on http://localhost:${process.env.PORT || 5000}`
    );
  });
});




