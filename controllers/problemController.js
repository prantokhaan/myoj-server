const {
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
  deleteAll,
} = require("../services/problemServices");

const getProblems = async (req, res) => {
    try {
        const problems = await allProblems();
    
        res.status(201).json({
        data: problems,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const getProblemById = async (req, res) => {
    try {
        const { id } = req.params;
        const problem = await singleProblemById(id);
    
        res.status(201).json({
        data: problem,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const createProblem = async (req, res) => {
    try {
        const { name, statement, input, output, constraints, timeLimit, memoryLimit, sampleInput, sampleOutput, problemSetter } = req.body;
        const problemCreated = await newProblem(
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
        );

        console.log("constraints", constraints);
    
        res.status(201).json({
        data: problemCreated,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const updateProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, statement, input, output, constraints, timeLimit, memoryLimit, contestId, problemSetter, problemType } = req.body;
        const updatedProblem = await putProblem(id, name, statement, input, output, constraints, timeLimit, memoryLimit, contestId, problemSetter, problemType);
    
        res.status(201).json({
        data: updatedProblem,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const removeProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const problemDeleted = await deleteProblem(id);
    
        res.status(201).json({
        data: problemDeleted,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const getContestProblems = async (req, res) => {
    try {
        const { id } = req.params;
        const contestProblems = await contestsProblems(id);
    
        res.status(201).json({
        data: contestProblems,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const getAddedBy = async (req, res) => {
    try {
        const { id } = req.params;
        const addedByAdmin = await addedBy(id);
    
        res.status(201).json({
        data: addedByAdmin,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const getProblemContest = async (req, res) => {
    try {
        const { id } = req.params;
        const contest = await getContest(id);
    
        res.status(201).json({
        data: contest,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const getProblemIsActive = async (req, res) => {
    try {
        const { id } = req.params;
        const status = await problemIsActive(id);
    
        res.status(201).json({
        data: status,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const updateProblemActive = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;
        const updatedStatus = await putProblemActive(id, isActive);
    
        res.status(201).json({
        data: updatedStatus,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const getProblemStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const status = await problemStatus(id);
    
        res.status(201).json({
        data: status,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const updateProblemStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedStatus = await putProblemStatus(id, status);
    
        res.status(201).json({
        data: updatedStatus,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const getActiveProblems = async (req, res) => {
    try {
        const problems = await allActiveProblems();
    
        res.status(201).json({
        data: problems,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const getInactiveProblems = async (req, res) => {
    try {
        const problems = await allInactiveProblems();
    
        res.status(201).json({
        data: problems,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};  

const getSpecificStatusProblems = async (req, res) => {
    try {
        const { status } = req.params;
        const problems = await allSpecificStatusProblems(status);
    
        res.status(201).json({
        data: problems,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const getSpecificRoleProblems = async (req, res) => {
    try {
        const { addedBy } = req.params;
        const problems = await allSpecificRoleProblems(addedBy);
    
        res.status(201).json({
        data: problems,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const getProblemType = async (req, res) => {
    try {
        const { id } = req.params;
        const type = await problemType(id);
    
        res.status(201).json({
        data: type,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const updateProblemType = async (req, res) => {
    try {
        const { id } = req.params;
        const { problemType } = req.body;
        const updatedType = await putProblemType(id, problemType);
    
        res.status(201).json({
        data: updatedType,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const getSpecificTypeProblems = async (req, res) => {
    try {
        const { problemType } = req.params;
        const problems = await allSpecificTypeProblems(problemType);
    
        res.status(201).json({
        data: problems,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const getAcceptedCountOfProblem = async (req, res) => {
    try{
        const {id} = req.params;
        const submissions = await acceptedCountOfProblem(id);

        res.status(201).json({
            data: submissions,
        });
    }catch(error){
        res.status(400).json({
            message: error.message,
        });
    }
};

const deleteAllProblems = async (req, res) => {
    try {
        const problems = await deleteAll();
    
        res.status(201).json({
        data: problems,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
}

module.exports = {
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
};



