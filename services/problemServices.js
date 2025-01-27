const Problem = require("../models/Problem");
const Contest = require("../models/Contest");

const allProblems = async () => {
    try{
        const problems = await Problem.findAll();

        if(!problems || problems.length === 0){
            return "No problems found";
        }

        return problems;
    }catch(error){
        console.error("Error fetching problems:", error);
        throw error;
    }
}

const singleProblemById = async (id) => {
    try{
        const problem = await Problem.findByPk(id);

        if(!problem){
            throw new Error("Problem not found");
        }

        return problem;
    }catch(error){
        console.error("Error fetching problem:", error);
        throw error;
    }
}

const newProblem = async (
  name,
  statement,
  input,
  output,
  constraints,
  timeLimit,
  memoryLimit,
  sampleInput,
  sampleOutput,
  problemSetter
) => {
  try {
    const nameValidation = await Problem.findOne({ where: { name } });

    if (nameValidation) {
      throw new Error("Problem already exists");
    }

    const createdProblem = await Problem.create({
      name,
      statement,
      input,
      output,
      constraints,
      timeLimit,
      memoryLimit,
      sampleInput,
      sampleOutput,
      problemSetter,
    });

    return createdProblem;
  } catch (error) {
    console.error("Error creating problem:", error);
    throw error;
  }
};

const putProblem = async (
  id,
  name,
  statement,
  input,
  output,
  constraints,
  timeLimit,
  memoryLimit,
  contestId,
  problemSetter
) => {
  try {
    const problem = await Problem.findByPk(id);

    if (!problem) {
      throw new Error("Problem not found");
    }

    // const contestValidation = await Contest.findByPk(contestId);

    // if(!contestValidation){
    //     throw new Error("Contest not found");
    // }

    const updatedProblem = await problem.update({
      name,
      statement,
      input,
      output,
      constraints,
      timeLimit,
      memoryLimit,
      contestId,
      problemSetter,
    }, {where: {id}});

    return updatedProblem;
  } catch (error) {
    console.error("Error updating problem:", error);
    throw error;
  }
};

const deleteProblem = async (id) => {
    try{
        const problem = await Problem.findByPk(id);

        if(!problem){
            throw new Error("Problem not found");
        }

        await problem.destroy();

        return "Problem deleted";
    }catch(error){
        console.error("Error deleting problem:", error);
        throw error;
    }
}

const contestsProblems = async (contestId) => {
    try{
        const problems = await Problem.findAll({where: {contestId}});

        if(!problems || problems.length === 0){
            return "No problems found for this contest";
        }

        return problems;
    }catch(error){
        console.error("Error fetching problems:", error);
        throw error;
    }
}

const addedBy = async (id) => {
    try{
        const problem = await Problem.findByPk(id);

        if(!problem){
            throw new Error("Problem not found");
        }

        return problem.addedBy;
    }catch(error){
        console.error("Error fetching added by:", error);
        throw error;
    }
}

const getContest = async (id) => {
    try{
        const problem = await Problem.findByPk(id);

        if(!problem){
            throw new Error("Problem not found");
        }

        const contest = problem.contestId;

        return contest;
    }catch(error){
        console.error("Error fetching contest:", error);
        throw error;
    }
}

const problemIsActive = async (id) => {
    try{
        const problem = await Problem.findByPk(id);

        if(!problem){
            throw new Error("Problem not found");
        }

        return problem.isActive;
    }catch(error){
        console.error("Error fetching problem status:", error);
        throw error;
    }
}

const putProblemActive = async (id, isActive) => {
    try{
        const problem = await Problem.findByPk(id);

        if(!problem){
            throw new Error("Problem not found");
        }

        await problem.update({isActive});

        const updatedProblem = await Problem.findByPk(id);

        return updatedProblem;
    }catch(error){
        console.error("Error updating problem status:", error);
        throw error;
    }
}

const problemStatus = async (id) => {
    try{
        const problem = await Problem.findByPk(id);

        if(!problem){
            throw new Error("Problem not found");
        }

        return problem.status;
    }catch(error){
        console.error("Error fetching problem status:", error);
        throw error;
    }
}

const putProblemStatus = async (id, status) => {
    try{
        const problem = await Problem.findByPk(id);

        if(!problem){
            throw new Error("Problem not found");
        }

        await problem.update({status});

        const updatedProblem = await Problem.findByPk(id);

        return updatedProblem;
    }catch(error){
        console.error("Error updating problem status:", error);
        throw error;
    }
}

const allActiveProblems = async () => {
    try{
        const problems = await Problem.findAll({where: {isActive: true}});

        if(!problems || problems.length === 0){
            throw new Error("No active problems found");
        }

        return problems;
    }catch(error){
        console.error("Error fetching active problems:", error);
        throw error;
    }
}

const allInactiveProblems = async () => {
    try{
        const problems = await Problem.findAll({where: {isActive: false}});

        if(!problems || problems.length === 0){
            throw new Error("No inactive problems found");
        }

        return problems;
    }catch(error){
        console.error("Error fetching inactive problems:", error);
        throw error;
    }
}

const allSpecificStatusProblems = async (status) => {
    try{
        const problems = await Problem.findAll({where: {status}});

        if(!problems || problems.length === 0){
            throw new Error("No problems found with this status");
        }

        return problems;
    }catch(error){
        console.error("Error fetching problems with this status:", error);
        throw error;
    }
}

const allSpecificRoleProblems = async (addedBy) => {
    try{
        const problems = await Problem.findAll({where: {addedBy}});

        if(!problems || problems.length === 0){
            throw new Error("No problems found with this role");
        }

        return problems;
    }catch(error){
        console.error("Error fetching problems with this role:", error);
        throw error;
    }
}

const problemType = async (id) => {
    try{
        const problem = await Problem.findByPk(id);

        if(!problem){
            throw new Error("Problem not found");
        }

        return problem.problemType;
    }catch(error){
        console.error("Error fetching problem type:", error);
        throw error;
    }
}

const putProblemType = async (id, problemType) => {
    try{
        const problem = await Problem.findByPk(id);

        if(!problem){
            throw new Error("Problem not found");
        }

        await problem.update({problemType});

        const updatedProblem = await Problem.findByPk(id);

        return updatedProblem;
    }catch(error){
        console.error("Error updating problem type:", error);
        throw error;
    }
}

const allSpecificTypeProblems = async (problemType) => {
    try{
        const problems = await Problem.findAll({where: {problemType}});

        if(!problems || problems.length === 0){
            throw new Error("No problems found with this type");
        }

        return problems;
    }catch(error){
        console.error("Error fetching problems with this type:", error);
        throw error;
    }
}

const acceptedCountOfProblem = async (problemId) => {
    try{
        const problem = await Problem.findByPk(problemId);

        if(!problem){
            throw new Error("Problem not found");
        }

        const submissions = await Submission.findAll({where: {problemId, status: "Accepted"}});

        return submissions.length;
    }catch(error){
        console.error("Error fetching accepted count of problem:", error);
        throw error;
    }
}

const deleteAll = async () => {
    try{
        await Problem.destroy({
            where: {},
            truncate: true
        });

        return "All problems deleted";
    }catch(error){
        console.error("Error deleting all problems:", error);
        throw error;
    }
}

module.exports = {
    allProblems,
    singleProblemById,
    newProblem,
    putProblem,
    deleteProblem,
    contestsProblems,
    addedBy,
    getContest,
    problemIsActive,
    putProblemActive,
    problemStatus,
    putProblemStatus,
    allActiveProblems,
    allInactiveProblems,
    allSpecificStatusProblems,
    allSpecificRoleProblems,
    problemType,
    putProblemType,
    allSpecificTypeProblems,
    acceptedCountOfProblem,
    deleteAll
};


