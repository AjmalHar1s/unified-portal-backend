import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

dotenv.config();
const app = express();

// ✅ Step 1: Configure CORS correctly
const allowedOrigins = ['https://sparkcareer-unified-portal.netlify.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));

// ✅ Step 2: Parse JSON
app.use(express.json());

// ✅ Step 3: Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// ✅ Step 4: Health Check
app.get("/", (req, res) => {
  res.send("🔥 Backend is running...");
});

// ✅ Step 5: Start Server
connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`);
  });
});
