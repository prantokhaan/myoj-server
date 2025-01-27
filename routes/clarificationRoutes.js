const express = require("express");
const {
  getAllClarifications,
  getSingleClarificationById,
  createClarification,
  updateClarification,
  removeClarification,
  getProblemClarifications,
  getContestClarifications,
  getUserClarifications,
  getContestProblemClarification,
  getUserContestClarifications,
  getUserProblemClarifications,
  updateAnswer,
} = require("../controllers/clarificationController");

const router = express.Router();

router.get("/", getAllClarifications);
router.get("/:id", getSingleClarificationById);
router.post("/create", createClarification);
router.put("/update/:id", updateClarification);
router.delete("/delete/:id", removeClarification);
router.get("/problem/:problemId", getProblemClarifications);
router.get("/contest/:contestId", getContestClarifications);
router.get("/user/:userId", getUserClarifications);
router.get("/contest/:contestId/problem/:problemId", getContestProblemClarification);
router.get("/user/:userId/contest/:contestId", getUserContestClarifications);
router.get("/user/:userId/problem/:problemId", getUserProblemClarifications);
router.put("/answer/:id", updateAnswer);

module.exports = router;