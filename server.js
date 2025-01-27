const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enables CORS for all origins
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/contests", require("./routes/contestRoutes"));
app.use("/admins", require("./routes/adminRoutes"));
app.use("/problems", require("./routes/problemRoutes"));
app.use("/testCases", require("./routes/testCaseRoutes"));
app.use("/editorials", require("./routes/editorialRoutes"));
app.use("/submissions", require("./routes/submissionRoutes"));
app.use("/clarifications", require("./routes/clarificationRoutes"));

// Error handling middleware
app.use(errorMiddleware);

// Sync database and start server
sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
