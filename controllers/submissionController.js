const fs = require("fs");
const Submission = require("../models/Submission");
const Problem = require("../models/Problem");
const TestCase = require("../models/TestCase");
const submissionQueue = require("../Queues/submissionQueue");
const {
  singleSubmissionById,
  allSubmissions,
  allSpecificTypeSubmissions,
  allSpecificUsersSubmissions,
  allSpecificProblemSubmissions,
  allSpecificProblemsSpecificUsersSubmissions,
  allSpecificProblemsSpecificTypeSubmissions,
  allSpecificUsersSpecificTypeSubmissions,
  allSpecificProblemsSpecificUsersSpecificTypeSubmissions,
  deleteSubmission,
  deleteAllSubmissions,
  acceptedCountOfProblem,
  specificContestSpecificProblemSpecificUserSubmissions,
  specificContestSpecificUserSubmissions,
} = require("../services/submissionServices");
const { get } = require("../routes/submissionRoutes");

// Function to handle problem submission
const submitProblem = async (req, res) => {
  try {
    const { userId, problemId, language, submissionType, contestId } = req.body;
    const submissionFile = req.file;

    console.log("Submission File: ", submissionFile);

    if (!submissionFile) {
      return res.status(400).json({ error: "No submission file provided." });
    }

    // Validate problem
    const problem = await Problem.findByPk(problemId);

    if (!problem) {
      return res.status(404).json({ error: "Problem not found." });
    }

    // Read the content of the file
    const code = fs.readFileSync(submissionFile.path, "utf8"); // Read file content as string

    // Create a new submission entry with the code content
    const submission = await Submission.create({
      submittedBy: userId,
      problemId,
      language,
      status: "Pending",
      code,
      submissionType,
      contestId,
    });

    // Add the submission to the queue for processing
    submissionQueue.add({ submissionId: submission.id, problemId });

    res.status(200).json({
      message: "Submission received and queued for processing.",
      submissionId: submission.id,
    });
  } catch (error) {
    console.error("Error in submitProblem:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const getSubmissionById = async (req, res) => {
    try{
        const submissionId = req.params.id;
        const submission = await singleSubmissionById(submissionId);

        if(!submission){
            return res.status(404).json({error: "Submission not found"});
        }

        res.status(200).json(submission);
    }catch(error){
        console.error("Error in getSubmissionById:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

const getAllSubmissions = async (req, res) => {
    try{
        const submissions = await allSubmissions();

        res.status(201).json(submissions);
    }catch(error){
        res.status(400).json({
          message: error.message,
        })
    }
}

const getSpecificTypeSubmissions = async (req, res) => {
    try{
        const type = req.params.type;
        const submissions = await allSpecificTypeSubmissions(type);

        res.status(200).json(submissions);
    }catch(error){
        res.status(400).json({
            message: error.message,
        })
    }
}

const getSpecificUsersSubmissions = async (req, res) => {
    try{
        const userId = req.params.userId;
        const submissions = await allSpecificUsersSubmissions(userId);

        res.status(200).json(submissions);
    }catch(error){
        res.status(400).json({
            message: error.message,
        })
    }
}

const getSpecificProblemSubmissions = async (req, res) => {
    try{
        const problemId = req.params.problemId;
        const submissions = await allSpecificProblemSubmissions(problemId);

        res.status(200).json(submissions);
    }catch(error){
        res.status(400).json({
            message: error.message,
        })
    }
}

const getSpecificProblemsSpecificUsersSubmissions = async (req, res) => {
    try{
        const problemId = req.params.problemId;
        const userId = req.params.userId;
        const submissions = await allSpecificProblemsSpecificUsersSubmissions(problemId, userId);

        res.status(200).json(submissions);
    }catch(error){
        res.status(400).json({
            message: error.message,
        })
    }
}

const getSpecificProblemsSpecificTypeSubmissions = async (req, res) => {
    try{
        const problemId = req.params.problemId;
        const type = req.params.type;
        const submissions = await allSpecificProblemsSpecificTypeSubmissions(problemId, type);

        res.status(200).json(submissions);
    }catch(error){
        res.status(400).json({
            message: error.message,
        })
    }
}

const getSpecificUsersSpecificTypeSubmissions = async (req, res) => {
    try{
        const userId = req.params.userId;
        const type = req.params.type;
        const submissions = await allSpecificUsersSpecificTypeSubmissions(userId, type);

        res.status(200).json(submissions);
    }catch(error){
        res.status(400).json({
            message: error.message,
        })
    }
}

const getSpecificProblemsSpecificUsersSpecificTypeSubmissions = async (req, res) => {
    try{
        const problemId = req.params.problemId;
        const userId = req.params.userId;
        const type = req.params.type;
        const submissions = await allSpecificProblemsSpecificUsersSpecificTypeSubmissions(problemId, userId, type);

        res.status(200).json(submissions);
    }catch(error){
        res.status(400).json({
            message: error.message,
        })
    }
}

const deleteSubmissionById = async (req, res) => {
    try{
        const submissionId = req.params.id;
        const submission = await deleteSubmission(submissionId);

        if(!submission){
            return res.status(404).json({error: "Submission not found"});
        }

        res.status(200).json({message: "Submission deleted successfully"});
    }catch(error){
        res.status(400).json({
            message: error.message,
        })
    }
}

const deleteAllSubmissionsHandler = async (req, res) => {
    try{
        const submissions = await deleteAllSubmissions();

        res.status(200).json({message: "All submissions deleted successfully"});
    }catch(error){
        res.status(400).json({
            message: error.message,
        })
    }
}

const getAcceptedCountOfProblem = async (req, res) => {
    try{
        const {id} = req.params;
        const submissions = await acceptedCountOfProblem(id);

        res.status(201).json({
            data: submissions,
        });
    }catch(error){
        res.status(400).json({
            message: error.message,
        });
    }
}

const getSpecificContestSpecificProblemSpecificUserSubmissions = async (req, res) => {
    try{
        const {contestId, problemId, userId} = req.params;
        const submissions = await specificContestSpecificProblemSpecificUserSubmissions(contestId, problemId, userId);

        res.status(200).json(submissions);
    }catch(error){
        console.log("Error in getSpecificContestSpecificProblemSpecificUserSubmissions: ", error);
        res.status(400).json({
            message: error.message,
        })
    }
}

const getSpecificContestSpecificUserSubmissions = async (req, res) => {
    try{
        const {contestId, userId} = req.params;
        const submissions = await specificContestSpecificUserSubmissions(contestId, userId);

        res.status(200).json(submissions);
    }catch(error){
        console.log("Error in getSpecificContestSpecificUserSubmissions: ", error);
        res.status(400).json({
            message: error.message,
        })
    }
}

module.exports = {
  submitProblem,
  getSubmissionById,
  getAllSubmissions,
  getSpecificTypeSubmissions,
  getSpecificUsersSubmissions,
  getSpecificProblemSubmissions,
  getSpecificProblemsSpecificUsersSubmissions,
  getSpecificProblemsSpecificTypeSubmissions,
  getSpecificUsersSpecificTypeSubmissions,
  getSpecificProblemsSpecificUsersSpecificTypeSubmissions,
  deleteSubmissionById,
  deleteAllSubmissionsHandler,
  getAcceptedCountOfProblem,
  getSpecificContestSpecificProblemSpecificUserSubmissions,
    getSpecificContestSpecificUserSubmissions,
};
