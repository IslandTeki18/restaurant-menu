const express = require("express");
const connectDB = require("./db");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Import models
const User = require("./src/models/User");
const MenuItem = require("./src/models/MenuItem");
const Restaurant = require("./src/models/Restaurant");
const TableAssignment = require("./src/models/TableAssignment");
const authRoutes = require("./src/routes/auth");
const menuRoutes = require("./src/routes/menu");
const squareRoutes = require("./src/routes/square");
const dashboardRoutes = require("./src/routes/dashboard");

app.use("/auth", authRoutes);
app.use("/menu", menuRoutes);
app.use("/square", squareRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
