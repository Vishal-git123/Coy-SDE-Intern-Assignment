const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Coy Backend Server is running!");
});

app.use("/api", profileRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log("Step 1: Connecting to MongoDB...");

    await connectDB();

    console.log("Step 2: MongoDB connected!");

    const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
    

    server.on("error", (error) => {
      console.error("Server error:", error);
    });
  } catch (error) {
    console.error("Startup error:", error);
  }
}

startServer();