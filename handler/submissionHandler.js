const fs = require("fs");
const { spawn, exec } = require("child_process");
const Submission = require("../models/Submission");
const TestCase = require("../models/TestCase");
const Problem = require("../models/Problem");
const TEMP_DIR = "./temp";
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);

const TIME_LIMIT = 2000; // Time limit in milliseconds
const MEMORY_LIMIT_MB = 256; // Memory limit in MB
const MAX_CONCURRENT_TESTS = 4;

const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.error(`Error deleting file ${filePath}:`, err.message);
    }
  }
};

const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, {maxBuffer: 1024*1024*10}, (error, stdout, stderr) => {
      if (error) {
        console.log("error: ", error);
        console.log("stderr: ", stderr);
        reject({ error });
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
};

const handleSubmission = async (submissionId, problemId) => {
  const submission = await Submission.findByPk(submissionId);
  const problem = await Problem.findByPk(problemId);
  const testCases = await TestCase.findAll({ where: { problemId } });

  const timeLimit = 40;
  const memoryLimit = 256;

  if (!submission || !problem || !testCases) {
    throw new Error("Invalid submission or problem.");
  }

  const language = submission.language;
  const codeContent = submission.code;

  // Normalize newlines to Unix style
  const normalizedCodeContent = codeContent.replace(/\r\n|\r/g, "\n");

  const fileExtension = {
    c: "c",
    cpp: "cpp",
    java: "java",
    python: "py",
    javascript: "js",
  }[language];

  if (!fileExtension) {
    throw new Error("Unsupported language.");
  }

  let submissionFile = `${TEMP_DIR}/submission.${fileExtension}`;
  if (language === "java") {
    submissionFile = `${TEMP_DIR}/Main.java`;
  }

  await fs.promises.writeFile(submissionFile, normalizedCodeContent);

  const compiledFile = `${TEMP_DIR}/submission.out`;

  const compileCommand = {
    c: `gcc -O2 ${submissionFile} -o ${compiledFile}`,
    cpp: `ccache g++ -O2 -std=c++17 ${submissionFile} -o ${compiledFile}`,
    java: `javac ${submissionFile}`,
    python: `python3 -m py_compile ${submissionFile}`,
    javascript: `node ${submissionFile}`,
  }[language];

  try {
    await runCommand(compileCommand);
  } catch (err) {
    console.error("Compilation error:", err);
    await submission.update({ verdict: "Compilation Error" });
    deleteFile(submissionFile); // Clean up submission file
    return;
  }

  await Submission.update(
    { verdict: "Running" },
    { where: { id: submissionId } }
  );

  let results = [];
  let testCasesPassed = 0;
  let executionTime = 0;
  let memoryUsed = 0;
  let overallVerdict = "Accepted";
  let stopExecution = false;

  // Create a function to handle test case execution
  const runTestCase = async (testCase) => {
    const inputFile = `${TEMP_DIR}/input.txt`;
    const outputFile = `${TEMP_DIR}/output.txt`;

    const inputTemp = testCase.input;
    const outputTemp = testCase.output;

    const contentOfInputFile = await fs.promises.readFile(inputTemp, "utf-8");
    const contentOfOutputFile = await fs.promises.readFile(outputTemp, "utf-8");

    await fs.promises.writeFile(inputFile, contentOfInputFile, "utf8");
    await fs.promises.writeFile(outputFile, contentOfOutputFile, "utf8");

    const runCommandStr = {
      c: `${compiledFile}`,
      cpp: `${compiledFile}`,
      java: `java -cp ${TEMP_DIR} Main`,
      python: `python3 ${submissionFile}`,
      javascript: `node ${submissionFile}`,
    }[language];

    const timeOutCommand = `timeout ${timeLimit} ${runCommandStr} < ${inputFile}`;

    const startTime = new Date();
    const memoryUsedStart = process.memoryUsage().heapUsed / 1024 / 1024;

    let runResult;
    try {
      runResult = await runCommand(timeOutCommand);
    } catch (err) {
      runResult = { error: err };
    }

    let verdictNow = "Accepted";
    let executionTimeNow = 0;
    let memoryUsedNow = 0;
    let actualOutput = runResult.stdout;

    const endTime = new Date();
    executionTimeNow = (endTime - startTime) / 1000;
    executionTime = Math.max(executionTime, executionTimeNow);

    const memoryUsedEnd = process.memoryUsage().heapUsed / 1024 / 1024;
    memoryUsedNow = memoryUsedEnd - memoryUsedStart;
    memoryUsed = Math.max(memoryUsed, memoryUsedNow);

    if (runResult.error) {
      if (runResult.error.error.code === 124) {
        verdictNow = "Time Limit Exceeded";
        actualOutput = "time limit exceeded";
      } else {
        verdictNow = "Runtime Error";
      }
    } else {
      if (actualOutput !== contentOfOutputFile) {
        verdictNow = "Wrong Answer";
      }
    }

    if (memoryUsed > memoryLimit) {
      verdictNow = "Memory Limit Exceeded";
    }

    if (verdictNow !== "Accepted") {
      overallVerdict = verdictNow;
      stopExecution = true; // Stop further test case execution
    } else {
      testCasesPassed++;
    }

    results.push({
      verdict: verdictNow,
      memoryUsed: memoryUsedNow,
      executionTime: executionTimeNow,
      submissionId: submission.id,
    });

    deleteFile(inputFile);
    deleteFile(outputFile);
  };

 
  const chunkTestCases = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const testCaseChunks = chunkTestCases(testCases, MAX_CONCURRENT_TESTS);

  for (let chunk of testCaseChunks) {
    await Promise.all(chunk.map((testCase) => runTestCase(testCase)));
    if (stopExecution) break; 
  }

  deleteFile(submissionFile);
  deleteFile(compiledFile);

  const finalVerdict =
    overallVerdict === "Accepted"
      ? "Accepted"
      : overallVerdict === "Time Limit Exceeded"
      ? "Time Limit Exceeded"
      : overallVerdict === "Memory Limit Exceeded"
      ? "Memory Limit Exceeded"
      : overallVerdict === "Runtime Error"
      ? "Runtime Error"
      : "Wrong Answer";

  await Submission.update(
    { verdict: finalVerdict, executionTime, memoryUsed, results },
    { where: { id: submissionId } }
  );

  console.log("Test Results: ", results);
};

module.exports = { handleSubmission };
