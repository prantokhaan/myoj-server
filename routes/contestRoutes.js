const express = require("express");
const { getContests, getContestById, createContest, updateContestStatus, deleteContest, getActiveContests, getInactiveContests, getContestStatus, getSpecificStatusContest, updateContest, activateContest, deActivateContest } = require("../controllers/contestController");

const router = express.Router();

router.get("/", getContests);
router.get("/contest/:id", getContestById);
router.get("/active", getActiveContests);
router.get("/inactive", getInactiveContests);
router.get("/status/:id", getContestStatus);
router.get("/specificStatus/:status", getSpecificStatusContest);

router.put("/update/:id", updateContest);
router.put("/activate/:id", activateContest);
router.put("/deactivate/:id", deActivateContest);
router.put("/updateStatus/:id", updateContestStatus);

router.post("/create", createContest);
router.delete("/delete/:id", deleteContest);

module.exports = router;