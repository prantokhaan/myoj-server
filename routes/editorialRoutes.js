const express = require("express");
const {getEditorials,
    getSingleEditorial,
    createEditorial,
    modifyEditorial,
    removeEditorial,
    getEditorialsByProblem,} = require("../controllers/editorialController");

const router = express.Router();

router.get("/", getEditorials);
router.get("/editorial/:id", getSingleEditorial);
router.post("/create", createEditorial);
router.put("/update/:id", modifyEditorial);
router.delete("/delete/:id", removeEditorial);
router.get("/problem/:problemId", getEditorialsByProblem);

module.exports = router;