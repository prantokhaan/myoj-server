const Editorial = require('../models/Editorial');
const Problem = require('../models/Problem');
const Admin = require('../models/Admin');

const allEditorials = async () => {
    try{
        const editorials = await Editorial.findAll();

        if(!editorials || editorials.length === 0){
            throw new Error("No editorials found");
        }

        return editorials;
    }catch(error){
        console.error("Error fetching editorials:", error);
        throw error;
    }
}

const singleEditorialById = async (id) => {
    try{
        const editorial = await Editorial.findByPk(id);

        if(!editorial){
            throw new Error("Editorial not found");
        }

        return editorial;
    }catch(error){
        console.error("Error fetching editorial:", error);
        throw error;
    }
}

const newEditorial = async (editorial, correctCode, problemId) => {
    try{
        const hasEditorial = await Editorial.findOne({where: {problemId}});
        if(hasEditorial){
            throw new Error("Editorial already exists for this problem");
        }
        const problemValid = await Problem.findByPk(problemId);

        if(!problemValid){
            throw new Error("Problem not found");
        }

        const newEditorial = await Editorial.create({editorial, correctCode, problemId});

        return {
            message: "Editorial created successfully",
            data: newEditorial
        };
    }catch(error){
        console.error("Error creating editorial:", error);
        throw error;
    }
}

const updateEditorial = async (id, editorial, correctCode, problemId) => {
    try{
        const editorialValid = await Editorial.findByPk(id);
        const problemValid = await Problem.findByPk(problemId);

        if(!editorialValid){
            throw new Error("Editorial not found");
        }

        if(!problemValid){
            throw new Error("Problem not found");
        }

        const updatedEditorial = await Editorial.update({editorial, correctCode, problemId}, {where: {id}});

        return {
            message: "Editorial updated successfully",
            data: updatedEditorial
        };
    }catch(error){
        console.error("Error updating editorial:", error);
        throw error;
    }
}

const deleteEditorial = async (id) => {
    try{
        const editorial = await Editorial.findByPk(id);

        if(!editorial){
            throw new Error("Editorial not found");
        }

        await editorial.destroy();

        return {
            message: "Editorial deleted successfully",
            data: editorial
        };
    }catch(error){
        console.error("Error deleting editorial:", error);
        throw error;
    }
}

const allEditorialsByProblem = async (problemId) => {
    try{
        const editorials = await Editorial.findAll({where: {problemId}});

        if(!editorials || editorials.length === 0){
            throw new Error("No editorials found");
        }

        return editorials;
    }catch(error){
        console.error("Error fetching editorials:", error);
        throw error;
    }
}



module.exports = {
    allEditorials,
    singleEditorialById,
    newEditorial,
    updateEditorial,
    deleteEditorial,
    allEditorialsByProblem,
}