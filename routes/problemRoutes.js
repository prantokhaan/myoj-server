const express = require("express");
const multer = require("multer");
const {
  getProblems,
  getProblemById,
  createProblem,
  updateProblem,
  removeProblem,
  getContestProblems,
  getAddedBy,
  getProblemContest,
  getProblemIsActive,
  updateProblemActive,
  getProblemStatus,
  updateProblemStatus,
  getActiveProblems,
  getInactiveProblems,
  getSpecificStatusProblems,
  getSpecificRoleProblems,
  getProblemType,
  updateProblemType,
  getSpecificTypeProblems,
  getAcceptedCountOfProblem,
  deleteAllProblems,
} = require("../controllers/problemController");

const router = express.Router();


router.get("/", getProblems);
router.get("/problem/:id", getProblemById);
router.post("/create", createProblem);
router.put("/update/:id", updateProblem);
router.delete("/delete/:id", removeProblem);
router.get("/contest/:id", getContestProblems);
router.get("/addedBy/:id", getAddedBy);
router.get("/problemContest/:id", getProblemContest);
router.get("/isActive/:id", getProblemIsActive);
router.put("/updateActive/:id", updateProblemActive);
router.get("/status/:id", getProblemStatus);
router.put("/updateStatus/:id", updateProblemStatus);
router.get("/getActive", getActiveProblems);
router.get("/getInactive", getInactiveProblems);
router.get("/specificStatus/:status", getSpecificStatusProblems);
router.get("/specificRole/:addedBy", getSpecificRoleProblems);
router.get("/type/:id", getProblemType);
router.put("/updateType/:id", updateProblemType);
router.get("/specificType/:problemType", getSpecificTypeProblems);
router.get("/acceptedCount/:id", getAcceptedCountOfProblem);
router.delete("/deleteAll", deleteAllProblems);

module.exports = router;

/* {
    "name": "test3",
    "statement": "test",
    "input": "test",
    "output": "test",
    "constraints": "test",
    "timeLimit": 1000,
    "memoryLimit": 1024,
    "contestId": 4,
    "addedBy": 1,
    "problemType": "fixed"

} */