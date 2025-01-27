const { allContests, singleContestById, newContest, putContest, delContest, activeContest, deactiveContest, activeContests, inactiveContests, contestStatus, putContestStatus, specificStatusContest } = require("../services/constestServices");


const getContests = async (req, res) => {
    try{
        const contests = await allContests();

        console.log(contests);

        res.status(201).json({
            data: contests
        });

    }catch(error){
        console.log(error);
        res.status(400).json({
            message: error.message
        });
    }
}

const getContestById = async (req, res) => {
    try{
        const {id} = req.params;
        const contest = await singleContestById(id);

        res.status(200).json({
            data: contest
        });

    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const createContest = async (req, res) => {
    try{
        const {name, description, startTime, duration} = req.body;
        const createdContest = await newContest({name, description, startTime, duration});

        res.status(201).json({
            message: "Contest created successfully",
            data: createdContest
        });
    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const updateContest = async (req, res) => {
    try{
        const {id} = req.params;
        const {name, description, startTime, duration} = req.body;
        const updatedContest = await putContest(id, name, startTime, description, duration);

        res.status(200).json({
            message: "Contest updated successfully",
            data: updatedContest
        });
    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const deleteContest = async (req, res) => {
    try{
        const {id} = req.params;
        const response = await delContest(id);

        console.log(response);


        res.status(200).json({
            message: "Contest deleted successfully"
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            message: error.message
        });
    }
}

const activateContest = async (req, res) => {
    try{
        const {id} = req.params;
        const activatedContest = await activeContest(id);

        res.status(200).json({
            message: "Contest activated successfully",
            data: activatedContest
        });
    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const deActivateContest = async (req, res) => {
    try{
        const {id} = req.params;
        const deactivatedContest = await deactiveContest(id);

        res.status(200).json({
            message: "Contest deactivated successfully",
            data: deactivatedContest
        });
    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const getActiveContests = async (req, res) => {
    try{
        const contests = await activeContests();

        res.status(201).json({
            data: contests
        });

    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const getInactiveContests = async (req, res) => {
    try{
        const contests = await inactiveContests();

        res.status(200).json({
            data: contests
        });

    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const getContestStatus = async (req, res) => {
    try{
        const {id} = req.params;
        const status = await contestStatus(id);

        res.status(200).json({
            data: status
        });

    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const updateContestStatus = async (req, res) => {
    try{
        const {id} = req.params;
        const {status} = req.body;
        const updatedStatus = await putContestStatus(id, status);

        res.status(200).json({
            message: "Contest status updated successfully",
            data: updatedStatus
        });
    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const getSpecificStatusContest = async (req, res) => {
    try{
        const {status} = req.params;
        const contests = await specificStatusContest(status);

        res.status(200).json({
            data: contests
        });

    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

module.exports = {
    getContests,
    getContestById,
    createContest,
    updateContest,
    deleteContest,
    activateContest,
    deActivateContest,
    getActiveContests,
    getInactiveContests,
    getContestStatus,
    updateContestStatus,
    getSpecificStatusContest
};