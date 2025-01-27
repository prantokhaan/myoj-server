const {
  allClarifications,
  singleClarificationById,
  newClarification,
  putClarification,
  deleteClarification,
  problemClarifications,
  contestClarifications,
  userClarifications,
  contestProblemClarification,
  userContestClarifications,
  userProblemClarifications,
  putAnswer,
} = require("../services/clarificationServices");

const getAllClarifications = async (req, res) => {
    try {
        const clarifications = await allClarifications();
    
        res.status(201).json({
        data: clarifications,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const getSingleClarificationById = async (req, res) => {
    try {
        const { id } = req.params;
        const clarification = await singleClarificationById(id);
    
        res.status(201).json({
        data: clarification,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const createClarification = async (req, res) => {
    try {
        const { userId, contestId, problemId, title, question, answer } = req.body;
        const clarification = await newClarification(problemId, contestId, userId, title, question, answer);
    
        res.status(201).json({
        data: clarification,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
}

const updateClarification = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, contestId, problemId, title, question, answer } = req.body;
        const updatedClarification = await putClarification(id, problemId, contestId, userId, title, question, answer);
    
        res.status(201).json({
        data: updatedClarification,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const removeClarification = async (req, res) => {
    try {
        const { id } = req.params;
        const removedClarification = await deleteClarification(id);
    
        res.status(201).json({
        data: removedClarification,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const getProblemClarifications = async (req, res) => {
    try {
        const { problemId } = req.params;
        const clarifications = await problemClarifications(problemId);
    
        res.status(201).json({
        data: clarifications,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const getContestClarifications = async (req, res) => {
    try {
        const { contestId } = req.params;
        const clarifications = await contestClarifications(contestId);
    
        res.status(201).json({
        data: clarifications,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const getUserClarifications = async (req, res) => {
    try {
        const { userId } = req.params;
        const clarifications = await userClarifications(userId);
    
        res.status(201).json({
        data: clarifications,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const getContestProblemClarification = async (req, res) => {
    try {
        const { contestId, problemId } = req.params;
        const clarifications = await contestProblemClarification(contestId, problemId);
    
        res.status(201).json({
        data: clarifications,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const getUserContestClarifications = async (req, res) => {
    try {
        const { userId, contestId } = req.params;
        const clarifications = await userContestClarifications(userId, contestId);
    
        res.status(201).json({
        data: clarifications,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const getUserProblemClarifications = async (req, res) => {
    try {
        const { userId, problemId } = req.params;
        const clarifications = await userProblemClarifications(userId, problemId);
    
        res.status(201).json({
        data: clarifications,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const updateAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const { answer } = req.body;
        const updatedClarification = await putAnswer(id, answer);
    
        res.status(201).json({
        data: updatedClarification,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

module.exports = {
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
};