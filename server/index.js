// Load environment variables
require("dotenv").config();

// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const config = require("./config");

// Import routes 
const taskRoute = require("./router/taskRouter");
const userRoute = require("./router/userRouter");

// Initialize Express app
const app = express();

// Load environment variables based on the environment
const db_uri = process.env.NODE_ENV === 'test' ? config.database.uri_test : config.database.uri_dev;

// Connect to MongoDB
// Connect DB (separate function)
const connectDB = async () => {
  try {
    await mongoose.connect(db_uri);
    console.log(`Connected to DB (${process.env.NODE_ENV})`);
  } catch (error) {
    console.log("DB connections error:", error);
    process.exit(1);
  }
};

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/v1', taskRoute)
app.use('/api/v1', userRoute)


// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling for uncaught routes or exceptions
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ error: "An unexpected error occurred" });
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await mongoose.connection.close();
  process.exit(0);
});

// Start the server
const port = config.app.port;

if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  })

}

module.exports = { app, connectDB };