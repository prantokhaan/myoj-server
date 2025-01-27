const {allAdmins, singleAdminById, newAdmin, putAdmin, deleteAdmin, adminRole, putAdminRole, specificRoleAdmin, adminIsActive, putAdminStatus, activeAdmins, inactiveAdmins, putAdminActive} = require("../services/adminServices");
const bcrypt = require("bcrypt");

const getAdmins = async (req, res) => {
    try{
        const admins = await allAdmins();

        res.status(201).json({
            data: admins
        });

    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const getAdminById = async (req, res) => {
    try{
        const {id} = req.params;
        const admin = await singleAdminById(id);

        res.status(200).json({
            data: admin
        });

    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const createAdmin = async (req, res) => {
    try{
        const {username, password, role} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdAdmin = await newAdmin(username, hashedPassword, role);

        res.status(201).json({
            data: createdAdmin
        });

    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const updateAdmin = async (req, res) => {
    try{
        const {id} = req.params;
        const {username, password, role} = req.body;
        const updatedAdmin = await putAdmin(id, username, password, role);

        res.status(200).json({
            data: updatedAdmin
        });
    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const removeAdmin = async (req, res) => {
    try{
        const {id} = req.params;
        const deletedAdmin = await deleteAdmin(id);

        res.status(200).json({
            data: deletedAdmin
        });
    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const getAdminRole = async (req, res) => {
    try{
        const {id} = req.params;
        const role = await adminRole(id);

        res.status(200).json({
            data: role
        });
    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const updateAdminRole = async (req, res) => {
    try{
        const {id} = req.params;
        const {role} = req.body;
        const updatedRole = await putAdminRole(id, role);

        res.status(200).json({
            data: updatedRole
        });
    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const getSpecificRoleAdmin = async (req, res) => {
    try{
        const {role} = req.params;
        const admins = await specificRoleAdmin(role);

        res.status(200).json({
            data: admins
        });
    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const getActiveStatus = async (req, res) => {
    try{
        const {id} = req.params;
        const status = await adminIsActive(id);

        res.status(200).json({
            data: status
        });
    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const updateAdminActive = async (req, res) => {
    try{
        const {id} = req.params;
        const {isActive} = req.body;
        const updatedStatus = await putAdminActive(id, isActive);

        res.status(200).json({
            data: updatedStatus
        });
    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const updateAdminStatus = async (req, res) => {
    try{
        const {id} = req.params;
        const {status} = req.body;
        const updatedStatus = await putAdminStatus(id, status);

        res.status(200).json({
            data: updatedStatus
        });
    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const getActiveAdmins = async (req, res) => {
    try{
        const admins = await activeAdmins();

        res.status(200).json({
            data: admins
        });
    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const getInactiveAdmins = async (req, res) => {
    try{
        const admins = await inactiveAdmins();

        res.status(200).json({
            data: admins
        });
    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

module.exports = {
    getAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    removeAdmin,
    getAdminRole,
    updateAdminRole,
    getSpecificRoleAdmin,
    getActiveStatus,
    updateAdminActive,
    updateAdminStatus,
    getActiveAdmins,
    getInactiveAdmins
}