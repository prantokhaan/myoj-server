const Clarification = require('../models/Clarification');
const Problem = require('../models/Problem');
const Contest = require('../models/Contest');
const User = require('../models/User');

const allClarifications = async () => {
    try{
        const clarifications = await Clarification.findAll();

        if(!clarifications || clarifications.length === 0){
            throw new Error("No clarifications found");
        }

        return clarifications;
    }catch(error){
        console.error("Error fetching clarifications:", error);
        throw error;
    }
}

const singleClarificationById = async (id) => {
    try{
        const clarification = await Clarification.findByPk(id);

        if(!clarification){
            throw new Error("Clarification not found");
        }

        return clarification;
    }catch(error){
        console.error("Error fetching clarification:", error);
        throw error;
    }
}

const newClarification = async (problemId, contestId, userId, title, question, answer) => {
    try{
        const problemValid = await Problem.findByPk(problemId);
        if(!problemValid){
            throw new Error("Problem not found");
        }

        const contestValid = await Contest.findByPk(contestId);
        if(!contestValid){
            throw new Error("Contest not found");
        }

        const userValid = await User.findByPk(userId);
        if(!userValid){
            throw new Error("User not found");
        }

        if(!answer){
            answer = null;
        }

        const clarification = await Clarification.create({problemId, contestId, userId, title, question, answer});

        return clarification;
    }catch(error){
        console.error("Error creating clarification:", error);
        throw error;
    }
}

const putClarification = async (id, problemId, contestId, userId, title, question, answer) => {
    try{
        const clarification = await Clarification.findByPk(id);

        if(!clarification){
            throw new Error("Clarification not found");
        }

        const problemValid = await Problem.findByPk(problemId);
        if(!problemValid){
            throw new Error("Problem not found");
        }

        const contestValid = await Contest.findByPk(contestId);
        if(!contestValid){
            throw new Error("Contest not found");
        }

        const userValid = await User.findByPk(userId);
        if(!userValid){
            throw new Error("User not found");
        }

        const updatedClarification = await clarification.update({problemId, contestId, userId, title, question, answer});

        return clarification;
    }catch(error){
        console.error("Error updating clarification:", error);
        throw error;
    }
}

const deleteClarification = async (id) => {
    try{
        const clarification = await Clarification.findByPk(id);

        if(!clarification){
            throw new Error("Clarification not found");
        }

        await clarification.destroy();

        return clarification;
    }catch(error){
        console.error("Error deleting clarification:", error);
        throw error;
    }
}

const problemClarifications = async (problemId) => {
    try{
        const clarifications = await Clarification.findAll({where: {problemId}});

        if(!clarifications || clarifications.length === 0){
            throw new Error("No clarifications found");
        }

        return clarifications;
    }catch(error){
        console.error("Error fetching clarifications:", error);
        throw error;
    }
}

const contestClarifications = async (contestId) => {
    try{
        const clarifications = await Clarification.findAll({where: {contestId}});

        if(!clarifications || clarifications.length === 0){
            throw new Error("No clarifications found");
        }

        return clarifications;
    }catch(error){
        console.error("Error fetching clarifications:", error);
        throw error;
    }
}

const userClarifications = async (userId) => {
    try{
        const clarifications = await Clarification.findAll({where: {userId}});

        if(!clarifications || clarifications.length === 0){
            throw new Error("No clarifications found");
        }

        return clarifications;
    }catch(error){
        console.error("Error fetching clarifications:", error);
        throw error;
    }
}


const contestProblemClarification = async (contestId, problemId) => {
    try{
        const clarifications = await Clarification.findAll({where: {contestId, problemId}});

        if(!clarifications || clarifications.length === 0){
            throw new Error("No clarifications found");
        }

        return clarifications;
    }catch(error){
        console.error("Error fetching clarifications:", error);
        throw error;
    }
}

const userContestClarifications = async (userId, contestId) => {
    try{
        const clarifications = await Clarification.findAll({where: {userId, contestId}});

        if(!clarifications || clarifications.length === 0){
            throw new Error("No clarifications found");
        }

        return clarifications;
    }catch(error){
        console.error("Error fetching clarifications:", error);
        throw error;
    }
}

const userProblemClarifications = async (userId, problemId) => {
    try{
        const clarifications = await Clarification.findAll({where: {userId, problemId}});

        if(!clarifications || clarifications.length === 0){
            throw new Error("No clarifications found");
        }

        return clarifications;
    }catch(error){
        console.error("Error fetching clarifications:", error);
        throw error;
    }
}

const putAnswer = async (id, answer) => {
    try{
        const clarification = await Clarification.findByPk(id);

        if(!clarification){
            throw new Error("Clarification not found");
        }

        const updatedClarification = await clarification.update({answer});

        return updatedClarification;
    }catch(error){
        console.error("Error updating clarification:", error);
        throw error;
    }
}

module.exports = {
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
    putAnswer
}