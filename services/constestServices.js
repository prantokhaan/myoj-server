const Contest = require('../models/Contest');
const { Op } = require('sequelize');

const allContests = async () => {
    try{
        const contests = await Contest.findAll();

        if(!contests){
            throw new Error("No contests found");
        }

        return contests;
    }catch(error){
        console.error("Error fetching contests:", error);
        throw error;
    }
}

const singleContestById = async (id) => {
    try{
        console.log("id: ", id);
        const contest = await Contest.findByPk(id);

        if(!contest){
            throw new Error("Contest not found");
        }

        return contest;
    }catch(error){
        console.error("Error fetching contest:", error);
        throw error;
    }
}

const newContest = async ({ name, description, startTime, duration }) => {
  try {
    // Check if a contest with the same name already exists
    const validation = await Contest.findOne({
      where: {
        name,
      },
    });

    if (validation) {
      throw new Error("Contest already exists");
    }

    // Get the current time in ISO format
    const timeNow = new Date().toISOString();
    console.log("timeNow: ", timeNow);
    console.log("startTime: ", startTime);

    // Convert startTime to a Date and validate it
    const startTimeDate = new Date(startTime);
    if (isNaN(startTimeDate.getTime())) {
      throw new Error("Invalid start time format");
    }

    const startTimeString = startTimeDate.toISOString();
    console.log("Parsed startTime: ", startTimeString);

    // Check if the start time is in the past
    if (startTimeString <= timeNow) {
      throw new Error("Start time should be greater than the current time");
    }

    // Create the contest
    const contest = await Contest.create({
      name,
      description,
      startTime: startTimeString, // Store as string
      duration,
    });

    return contest;
  } catch (error) {
    console.error("Error creating contest:", error.message);
    throw error;
  }
};

const putContest = async (id, name, startTime, description, duration) => {
  try {
    console.log("id: ", id);

    // Find the contest by primary key
    const contest = await Contest.findByPk(id);
    if (!contest) {
      throw new Error("Contest not found");
    }

    // Validate if another contest with the same name exists
    const nameValidation = await Contest.findAll({
      where: {
        name,
        id: {
          [Op.ne]: id, // Not equal to the current contest id
        },
      },
    });

    if (nameValidation.length > 0) {
      throw new Error("A contest with this name already exists");
    }

    // Validate startTime
    const timeNow = new Date().toISOString();
    console.log("timeNow: ", timeNow);
    console.log("startTime: ", startTime);

    // Convert startTime to a Date and validate it
    const startTimeDate = new Date(startTime);
    if (isNaN(startTimeDate.getTime())) {
      throw new Error("Invalid start time format");
    }

    const startTimeString = startTimeDate.toISOString();
    console.log("Parsed startTime: ", startTimeString);

    // Check if the start time is in the past
    if (startTimeString <= timeNow) {
      throw new Error("Start time should be greater than the current time");
    }

    // Update the contest
    await contest.update({
      name,
      description,
      startTime: startTimeString, // Ensure startTime is a Date object
      duration,
    });

    // Return the updated contest
    const updatedContest = await Contest.findByPk(id);
    return updatedContest;
  } catch (error) {
    console.error("Error updating contest:", error.message);
    throw error;
  }
};


const delContest = async (id) => {
    try{
        const contest = await Contest.findByPk(id);
        console.log("contest: ", contest);
        if(!contest){
            throw new Error("Contest not found");
        }

        const resss = await contest.destroy();
        console.log("resss: ", resss);

        return true;
    }catch(error){
        console.error("Error deleting contest:", error);
        throw error;
    }
}

const activeContest = async (id) => {
    try{
        const contest = await Contest.findByPk(id);
        if(!contest){
            throw new Error("Contest not found");
        }

        await contest.update({
            isActive: true
        });

        const updatedContest = await Contest.findByPk(id);

        return updatedContest;
    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const deactiveContest = async (id) => {
    try{
        const contest = await Contest.findByPk(id);
        if(!contest){
            throw new Error("Contest not found");
        }

        await contest.update({
            isActive: false
        });

        const updatedContest = await Contest.findByPk(id);

        return updatedContest;
    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const activeContests = async () => {
    try{
        const contests = await Contest.findAll({
            where: {
                isActive: true
            }
        });

        console.log(contests);

        if(!contests){
            throw new Error("No active contests found");
        }
        
        return contests;
    }catch(error){
        console.error("Error fetching active contests:", error);
        throw error;
    }
}

const inactiveContests = async () => {
    try{
        const contests = await Contest.findAll({
            where: {
                isActive: false
            }
        });
        
        if(!contests){
            throw new Error("No inactive contests found");
        }

        return contests;
    }catch(error){
       console.error("Error fetching inactive contests:", error);
         throw error;
    }
}

const contestStatus = async (id) => {
    try{
        const contest = await Contest.findByPk(id);
        if(!contest){
            throw new Error("Contest not found");
        }

        return contest.status;
    }catch(error){
        console.error("Error fetching contest status:", error);
        throw error;
    }
}

const putContestStatus = async (id, status) => {
    try{
        const contest = await Contest.findByPk(id);

        if(!contest){
            throw new Error("Contest not found");
        }

        await contest.update({
            status
        });

        const updatedContest = await Contest.findByPk(id);

        return updatedContest;
    }catch(error){
        console.error("Error updating contest status:", error);
        throw error;
    }
}

const specificStatusContest = async (status) => {
    try{
        const statusContests = await Contest.findAll({
            where: {
                status
            }
        });

        if(!statusContests){
            throw new Error("No contests found with this status");
        }

        return statusContests;
    }catch(error){
        console.error("Error fetching contests with this status:", error);
        throw error;
    }
}

module.exports = {
    allContests,
    singleContestById,
    newContest,
    putContest,
    delContest,
    activeContest,
    deactiveContest,
    activeContests,
    inactiveContests,
    contestStatus,
    putContestStatus,
    specificStatusContest
};