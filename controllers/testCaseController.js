const {
  allTestCases,
  testCaseById,
  newTestCase,
  putTestCase,
  deleteTestCase,
  testCasesByProblem,
  testCasesByCustomCode,
  putTestCaseInput,
  putTestCaseOutput,
  putTestCaseCustomCode,
  putTestCaseProblem,
  deleteAll,
} = require("../services/testCaseServices");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const getTestCases = async (req, res) => {
    try {
        const testCases = await allTestCases();
    
        res.status(201).json({
        data: testCases,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
}

const getTestCaseById = async (req, res) => {
    try {
        const { id } = req.params;
        const testCase = await testCaseById(id);
    
        res.status(201).json({
        data: testCase,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
}

const createTestCase = async (req, res) => {
  try {
    const { customCode, problemId } = req.body;

    if (!req.files || !req.files.inputFile || !req.files.outputFile) {
      return res
        .status(400)
        .json({ message: "Input and Output files are required!" });
    }

    const inputFile = req.files.inputFile[0];
    const outputFile = req.files.outputFile[0]; 

    const initialTestCase = {
      input: "placeholder", // Temporary value
      output: "placeholder", // Temporary value
      customCode,
      problemId,
    };
    const testCaseCreated = await newTestCase(
      initialTestCase.input,
      initialTestCase.output,
      problemId,
      customCode
    );

    const testCaseId = testCaseCreated.id; 
    const uploadDir = path.join(__dirname, "../uploads/testCases");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const inputFileName = `input_${problemId}_${testCaseId}`;
    const outputFileName = `output_${problemId}_${testCaseId}`;

    const inputFilePath = path.join(uploadDir, inputFileName);
    const outputFilePath = path.join(uploadDir, outputFileName);

    console.log("inputFilePath:", inputFilePath);
    console.log("outputFilePath:", outputFilePath);

    fs.writeFileSync(inputFilePath, inputFile.buffer);
    fs.writeFileSync(outputFilePath, outputFile.buffer);

    const updateInput = putTestCaseInput(testCaseId, inputFilePath);
    const updateOutput = putTestCaseOutput(testCaseId, outputFilePath);

    const updatedTestCase = await putTestCase(
      testCaseId,
      updateInput.input,
      updateOutput.output,
      customCode,
      problemId
    );

    res.status(201).json({
      data: updatedTestCase,
      message: "Test case created successfully!",
    });
  } catch (error) {
    console.error("Error creating test case:", error);
    res.status(400).json({
      message: error.message || "Failed to create test case",
    });
  }
};

const updateTestCase = async (req, res) => {
    try {
        const { id } = req.params;
        const { input, output, customCode, problemId } = req.body;
        const updatedTestCase = await putTestCase(id, input, output, customCode, problemId);
    
        res.status(201).json({
        data: updatedTestCase,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
}

const removeTestCase = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTestCase = await deleteTestCase(id);
    
        res.status(201).json({
        data: deletedTestCase,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
}

const getTestCasesByProblem = async (req, res) => {
    try {
        const { problemId } = req.params;
        const testCases = await testCasesByProblem(problemId);
    
        res.status(201).json({
        data: testCases,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
}

const getTestCasesByCustomCode = async (req, res) => {
    try {
        const { customCode } = req.params;
        const testCases = await testCasesByCustomCode(customCode);
    
        res.status(201).json({
        data: testCases,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
}

const updateTestCaseInput = async (req, res) => {
    try {
        const { id } = req.params;
        const { input } = req.body;
        const updatedTestCase = await putTestCaseInput(id, input);
    
        res.status(201).json({
        data: updatedTestCase,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
}

const updateTestCaseOutput = async (req, res) => {
    try {
        const { id } = req.params;
        const { output } = req.body;
        const updatedTestCase = await putTestCaseOutput(id, output);
    
        res.status(201).json({
        data: updatedTestCase,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
}

const updateTestCaseCustomCode = async (req, res) => {
    try {
        const { id } = req.params;
        const { customCode } = req.body;
        const updatedTestCase = await putTestCaseCustomCode(id, customCode);
    
        res.status(201).json({
        data: updatedTestCase,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
}

const updateTestCaseProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const { problemId } = req.body;
        const updatedTestCase = await putTestCaseProblem(id, problemId);
    
        res.status(201).json({
        data: updatedTestCase,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
}

const deleteAllTestCases = async (req, res) => {
    try {
        const deletedTestCases = await deleteAll();
    
        res.status(201).json({
        data: deletedTestCases,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
}



module.exports = {
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

};