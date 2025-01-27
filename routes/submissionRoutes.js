const express = require("express");
const multer = require("multer");
const {
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
} = require("../controllers/submissionController");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/submissions/"); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
console.log(upload);

// Route to handle problem submission
router.post("/submit", upload.single("file"), submitProblem);
router.get("/", getAllSubmissions);
router.get("/submission/:id", getSubmissionById);
router.get("/type/:type", getSpecificTypeSubmissions);
router.get("/users/:userId", getSpecificUsersSubmissions);
router.get("/problem/:problemId", getSpecificProblemSubmissions);
router.get("/problems/:problemId/users/:userId", getSpecificProblemsSpecificUsersSubmissions);
router.get("/problems/:problemId/type/:type", getSpecificProblemsSpecificTypeSubmissions);
router.get("/users/:userId/type/:type", getSpecificUsersSpecificTypeSubmissions);
router.get("/problems/:problemId/users/:userId/type/:type", getSpecificProblemsSpecificUsersSpecificTypeSubmissions);
router.delete("/delete/:id", deleteSubmissionById);
router.delete("/deleteAll/", deleteAllSubmissionsHandler);
router.get("/acceptedCount/:id", getAcceptedCountOfProblem);
router.get("/contest/:contestId/problem/:problemId/user/:userId", getSpecificContestSpecificProblemSpecificUserSubmissions);
router.get("/contest/:contestId/user/:userId", getSpecificContestSpecificUserSubmissions);


module.exports = router;
