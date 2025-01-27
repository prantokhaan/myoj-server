// submissionQueue.js

const Queue = require("bull");
const { judgeSubmission } = require("../services/submissionServices"); // Import the function to judge submissions

// Initialize the queue
const submissionQueue = new Queue("submissionQueue", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
  settings: {
    stalledInterval: 1000, // Check every 1 second if the job has stalled
    maxStalledCount: 3, // Retries 3 times before failing a job
  },
});

submissionQueue.process(5, async (job) => {
  console.log("Processing job:", job.id);
  const { submissionId, problemId } = job.data;

  try {
    // Judge the submission
    const result = await judgeSubmission(submissionId, problemId);
    console.log(`Job ${job.id} completed with result:`, result);
    return result;
  } catch (err) {
    console.error(`Error processing job ${job.id}:`, err);
    throw err; // Mark the job as failed
  }
});

submissionQueue.on("completed", (job, result) => {
  console.log(`Job with ID ${job.id} has been completed`, result);
});

submissionQueue.on("failed", (job, err) => {
  console.log(`Job with ID ${job.id} has failed`, err);
});

module.exports = submissionQueue;


