const express = require("express");
const multer = require("multer");
const {
  getTestCases,
  getTestCaseById,
  createTestCase,
  updateTestCase,
  removeTestCase,
  getTestCasesByProblem,
  getTestCasesByCustomCode,
  updateTestCaseInput,
  updateTestCaseOutput,
  updateTestCaseCustomCode,
  updateTestCaseProblem,
  deleteAllTestCases,
} = require("../controllers/testCaseController");
const router = express.Router();

const storage = multer.memoryStorage(); // Store files in memory for easy processing
const upload = multer({ storage });

router.get("/", getTestCases);
router.get("/testCase/:id", getTestCaseById);
router.post(
  "/create",
  upload.fields([
    { name: "inputFile", maxCount: 1 }, // Input file
    { name: "outputFile", maxCount: 1 }, // Output file
  ]),
  createTestCase
); 
router.put("/update/:id", updateTestCase);
router.delete("/delete/:id", removeTestCase);
router.get("/problem/:problemId", getTestCasesByProblem);
router.get("/customCode/:customCode", getTestCasesByCustomCode);
router.put("/updateInput/:id", updateTestCaseInput);
router.put("/updateOutput/:id", updateTestCaseOutput);
router.put("/updateCustomCode/:id", updateTestCaseCustomCode);
router.put("/updateProblem/:id", updateTestCaseProblem);
router.get("/deleteAll", deleteAllTestCases);

module.exports = router;