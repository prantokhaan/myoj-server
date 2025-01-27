require("dotenv").config(); // Load environment variables
const { Sequelize } = require("sequelize");
const submissionQueue = require("../Queues/submissionQueue"); // Import the submission queue

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Database host
    port: process.env.DB_PORT || 3306, // Default MySQL port
    dialect: "mysql", // Database dialect
    logging: false, // Disable Sequelize logging
  }
);

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    process.exit(1); // Exit the worker if the database connection fails
  }
})();

// Event listener for when the worker starts processing
submissionQueue.on("waiting", (jobId) => {
  console.log(`Job with ID ${jobId} is waiting in the queue`);
});

// Event listener for when the worker starts processing a job
submissionQueue.on("active", (job) => {
  console.log(`Job ${job.id} is active.`);
});

// Event listener for when the job completes
submissionQueue.on("completed", (job, result) => {
  console.log(`Job with ID ${job.id} has been completed. Result:`, result);
});

// Event listener for when the job fails
submissionQueue.on("failed", (job, err) => {
  console.log(`Job with ID ${job.id} has failed. Error:`, err);
});

// Event listener for when the job is stalled
submissionQueue.on("stalled", (job) => {
  console.log(`Job ${job.id} has stalled.`);
});

// Log worker start
console.log("Worker started and ready to process jobs.");
