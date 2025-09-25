require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/internships", require("./routes/internshipRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));

// Basic health check route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.get("/api", (req, res) => {
  res.json({ ok: true });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ msg: "Server error", error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
