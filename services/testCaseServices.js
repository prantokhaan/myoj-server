const TestCase = require('../models/TestCase');
const Problem = require('../models/Problem');
const fs = require('fs');
const path = require('path');

const deleteFile = async (filePath) => {
    try{
        await fs.unlink(filePath);
    }catch(error){
        console.error("Error deleting file:", error);
        throw error;
    }
}

const allTestCases = async () => {
    try{
        const testCases = await TestCase.findAll();

        if(!testCases || testCases.length === 0){
            throw new Error("No test cases found");
        }

        return testCases;
    }catch(error){
        console.error("Error fetching test cases:", error);
        throw error;
    }
}

const testCaseById = async (id) => {
    try{
        const testCase = await TestCase.findByPk(id);

        if(!testCase){
            throw new Error("Test case not found");
        }

        return testCase;
    }catch(error){
        console.error("Error fetching test case:", error);
        throw error;
    }
}

const newTestCase = async (input, output, problemId, customCode) => {
    try{
        const problemValidation = await Problem.findByPk(problemId);

        if(!problemValidation){
            throw new Error("Problem not found");
        }

        const testCase = await TestCase.create({input, output, problemId, customCode});

        return testCase;
    }catch(error){
        console.error("Error creating test case:", error);
        throw error;
    }
}

const putTestCase = async (id, input, output, customCode, problemId) => {
    try{
        const problemValidation = await Problem.findByPk(problemId);

        if(!problemValidation){
            throw new Error("Problem not found");
        }

        const testCase = await TestCase.findByPk(id);

        if(!testCase){
            throw new Error("Test case not found");
        }

        const updatedTestCase = await testCase.update({input, output, problemId, customCode});

        return updatedTestCase;
    }catch(error){
        console.error("Error updating test case:", error);
        throw error;
    }
}


const deleteTestCase = async (id) => {
  try {
    // Find the test case by ID
    const testCase = await TestCase.findByPk(id);

    if (!testCase) {
      throw new Error("Test case not found");
    }

    const { input: inputFile, output: outputFile } = testCase;

    // Delete the test case record from the database
    await testCase.destroy();

    // Delete the input file
    if (inputFile) {
      try {
        await fs.unlinkSync(inputFile);
        console.log(`Input file deleted: ${inputFile}`);
      } catch (error) {
        console.error(`Failed to delete input file: ${inputFile}`, error);
      }
    }

    // Delete the output file
    if (outputFile) {
      try {
        await fs.unlinkSync(outputFile);
        console.log(`Output file deleted: ${outputFile}`);
      } catch (error) {
        console.error(`Failed to delete output file: ${outputFile}`, error);
      }
    }

    return testCase;
  } catch (error) {
    console.error("Error deleting test case:", error);
    throw error;
  }
};

const testCasesByProblem = async (problemId) => {
    try{
        const testCases = await TestCase.findAll({where: {problemId}});

        if(!testCases || testCases.length === 0){
            throw new Error("No test cases found for this problem");
        }

        return testCases;
    }catch(error){
        console.error("Error fetching test cases:", error);
        throw error;
    }
}

const testCasesByCustomCode = async (customCode) => {
    try{
        const testCases = await TestCase.findAll({where: {customCode}});

        if(!testCases || testCases.length === 0){
            throw new Error("No test cases found for this custom code");
        }

        return testCases;
    }catch(error){
        console.error("Error fetching test cases:", error);
        throw error;
    }
}

const putTestCaseInput = async (id, input) => {
    try{
        const testCase = await TestCase.findByPk(id);

        console.log(testCase);

        if(!testCase){
            throw new Error("Test case not found");
        }

        const updatedTestCase = await testCase.update({input});

        return updatedTestCase;
    }catch(error){
        console.error("Error updating test case:", error);
        throw error;
    }
}

const putTestCaseOutput = async (id, output) => {
    try{
        const testCase = await TestCase.findByPk(id);

        if(!testCase){
            throw new Error("Test case not found");
        }

        const updatedTestCase = await testCase.update({output});

        return updatedTestCase;
    }catch(error){
        console.error("Error updating test case:", error);
        throw error;
    }
}

const putTestCaseCustomCode = async (id, customCode) => {
    try{
        const testCase = await TestCase.findByPk(id);

        if(!testCase){
            throw new Error("Test case not found");
        }

        const updatedTestCase = await testCase.update({customCode});

        return updatedTestCase;
    }catch(error){
        console.error("Error updating test case:", error);
        throw error;
    }
}

const putTestCaseProblem = async (id, problemId) => {
    try{

        const problemValidation = await Problem.findByPk(problemId);

        if(!problemValidation){
            throw new Error("Problem not found");
        }

        const testCase = await TestCase.findByPk(id);

        if(!testCase){
            throw new Error("Test case not found");
        }

        const updatedTestCase = await testCase.update({problemId});

        return updatedTestCase;
    }catch(error){
        console.error("Error updating test case:", error);
        throw error;
    }
}

const deleteAll = async () => {
    try{
        const testCases = await TestCase.destroy({where: {}});
        return testCases;
    }catch(error){
        console.error("Error deleting test cases:", error);
        throw error;
    }
}

module.exports = {
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
}