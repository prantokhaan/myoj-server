const {
  allEditorials,
  singleEditorialById,
  newEditorial,
  updateEditorial,
  deleteEditorial,
  allEditorialsByProblem,
} = require("../services/editorialServices");

const getEditorials = async (req, res) => {
    try {
        const editorials = await allEditorials();
    
        res.status(201).json({
        data: editorials,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
};

const getSingleEditorial = async (req, res) => {
    try {
        const { id } = req.params;
        const editorial = await singleEditorialById(id);
    
        res.status(201).json({
        data: editorial,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
}

const createEditorial = async (req, res) => {
    try {
        const { editorial, correctCode, problemId } = req.body;
        const createdEditorial = await newEditorial(editorial, correctCode, problemId);
    
        res.status(201).json({
        data: createdEditorial,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
}

const modifyEditorial = async (req, res) => {
    try {
        const { id } = req.params;
        const { editorial, correctCode, problemId } = req.body;
        const updatedEditorial = await updateEditorial(id, editorial, correctCode, problemId);
    
        res.status(201).json({
        data: updatedEditorial,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
}

const removeEditorial = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEditorial = await deleteEditorial(id);
    
        res.status(201).json({
        data: deletedEditorial,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
}

const getEditorialsByProblem = async (req, res) => {
    try {
        const { problemId } = req.params;
        const editorials = await allEditorialsByProblem(problemId);
    
        res.status(201).json({
        data: editorials,
        });
    } catch (error) {
        res.status(400).json({
        message: error.message,
        });
    }
}



module.exports = {
    getEditorials,
    getSingleEditorial,
    createEditorial,
    modifyEditorial,
    removeEditorial,
    getEditorialsByProblem,
};