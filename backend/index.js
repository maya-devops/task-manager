require("dotenv").config();
const taskRoutes = require("./routes/taskRoutes");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");


const app = express();
connectDB();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON in request body" });
  }
  console.error(err);
  res.status(500).json({ message: "Something went wrong on the server" });
});
app.listen(PORT, (error) => {
  if (error) {
    console.error("Server failed to start:", error.message);
    return;
  }
  console.log(`Server running on port ${PORT}`);
});