const fs = require("fs");
const { exec } = require("child_process");
const Submission = require("../models/Submission");
const TestCase = require("../models/TestCase");
const Problem = require("../models/Problem");
const {handleSubmission} = require("../handler/submissionHandler");



const judgeSubmission = async (submissionId, problemId) => {
    const result = handleSubmission(submissionId, problemId);

    return result;
};

const singleSubmissionById = async(id) => {
    try{
        const submission = await Submission.findByPk(id);

        if(!submission){
            throw new Error("Submission not found");
        }

        const problem = await Problem.findByPk(submission.problemId);

        return {submission, problem};
    }catch(err){
        console.error("Error in singleSubmissionById: ", err);
        throw err;
    }
};

const allSubmissions = async() => {
    try{
        const submissions = await Submission.findAll();

        if(!submissions || submissions.length === 0){
            throw new Error("No submissions found");
        }

        return submissions;
    }catch(err){
        console.error("Error in allSubmissions: ", err);
        throw err;
    }
}

const allSpecificTypeSubmissions = async(submissionType) => {
    try{
        const submissions = await Submission.findAll({where: {submissionType}});

        if(!submissions || submissions.length === 0){
            throw new Error("No submissions found with this type");
        }

        return submissions;
    }catch(err){
        console.error("Error in allSpecificTypeSubmissions: ", err);
        throw err;
    }
}

const allSpecificUsersSubmissions = async (submittedBy) => {
    try{
        const submissions = await Submission.findAll({where: {submittedBy}});

        if(!submissions || submissions.length === 0){
            throw new Error("No submissions found with this user");
        }

        return submissions;
    }catch(err){
        console.error("Error in allSpecificUsersSubmissions: ", err);
        throw err;
    }
}

const allSpecificProblemSubmissions = async(problemId) => {
    try{
        const submissions = await Submission.findAll({where: {problemId}});

        if(!submissions || submissions.length === 0){
            throw new Error("No submissions found with this problem");
        }

        return submissions;
    }catch(err){
        console.error("Error in allSpecificProblemSubmissions: ", err);
        throw err;
    }
}

const allSpecificProblemsSpecificUsersSubmissions = async(problemId, submittedBy) => {
    try{
        const submissions = await Submission.findAll({where: {problemId, submittedBy}});

        if(!submissions || submissions.length === 0){
            throw new Error("No submissions found with this problem and user");
        }

        return submissions;
    }catch(err){
        console.error("Error in allSpecificProblemsSpecificUsersSubmissions: ", err);
        throw err;
    }
}

const allSpecificProblemsSpecificTypeSubmissions = async(problemId, submissionType) => {
    try{
        const submissions = await Submission.findAll({where: {problemId, submissionType}});

        if(!submissions || submissions.length === 0){
            throw new Error("No submissions found with this problem and type");
        }

        return submissions;
    }catch(err){
        console.error("Error in allSpecificProblemsSpecificTypeSubmissions: ", err);
        throw err;
    }
}

const allSpecificUsersSpecificTypeSubmissions = async(submittedBy, submissionType) => {
    try{
        const submissions = await Submission.findAll({where: {submittedBy, submissionType}});

        if(!submissions || submissions.length === 0){
            throw new Error("No submissions found with this user and type");
        }

        return submissions;
    }catch(err){
        console.error("Error in allSpecificUsersSpecificTypeSubmissions: ", err);
        throw err;
    }
}

const allSpecificProblemsSpecificUsersSpecificTypeSubmissions = async(problemId, submittedBy, submissionType) => {
    try{
        const submissions = await Submission.findAll({where: {problemId, submittedBy, submissionType}});

        if(!submissions || submissions.length === 0){
            throw new Error("No submissions found with this problem, user and type");
        }

        return submissions;
    }catch(err){
        console.error("Error in allSpecificProblemsSpecificUsersSpecificTypeSubmissions: ", err);
        throw err;
    }
}

const deleteSubmission = async(id) => {
    try{
        const submission = await Submission.findByPk(id);

        if(!submission){
            throw new Error("Submission not found");
        }

        await submission.destroy();

        return submission;
    }catch(err){
        console.error("Error in deleteSubmission: ", err);
        throw err;
    }
}

const deleteAllSubmissions = async() => {
    try{
        const submissions = await Submission.findAll();

        if(!submissions || submissions.length === 0){
            throw new Error("No submissions found");
        }

        await Submission.destroy({where: {}});

        return submissions;
    }catch(err){
        console.error("Error in deleteAllSubmissions: ", err);
        throw err;
    }
}  

const acceptedCountOfProblem = async (problemId) => {
    try{
        const problem = await Problem.findByPk(problemId);

        if(!problem){
            throw new Error("Problem not found");
        }

        const submissions = await Submission.findAll({where: {problemId, verdict: "Accepted"}});

        return submissions.length;
    }catch(error){
        console.error("Error fetching accepted count of problem:", error);
        throw error;
    }
}

const specificContestSpecificProblemSpecificUserSubmissions = async(contestId, problemId, userId) => {
    try{
        const submissions = await Submission.findAll({where: {contestId, problemId, submittedBy: userId}});
        if(!submissions || submissions.length === 0){
            throw new Error("No submissions found");
        }

        return submissions;
    }catch(err){
        console.error("Error in specificContestSpecificProblemSpecificUserSubmissions: ", err);
        throw err;
    }
}

const specificContestSpecificUserSubmissions = async(contestId, userId) => {
    try{
        const submissions = await Submission.findAll({where: {contestId, submittedBy: userId}});
        if(!submissions || submissions.length === 0){
            throw new Error("No submissions found");
        }

        const result = [];

        for(let i = 0; i < submissions.length; i++){
            const submission = submissions[i];
            const problem = await Problem.findByPk(submission.problemId);
            result.push({submission, problem});
        }

        return result;
    }catch(err){
        console.error("Error in specificContestSpecificUserSubmissions: ", err);
        throw err;
    }
}



// Helper function to run commands as promises


module.exports = {
  judgeSubmission,
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
    specificContestSpecificUserSubmissions
};
