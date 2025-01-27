const Admin = require("../models/Admin");

const allAdmins = async () => {
    try{
        const admins = await Admin.findAll();

        if(!admins || admins.length === 0){
            throw new Error("No admins found");
        }

        return admins;
    }catch(error){
        console.error("Error fetching admins:", error);
        throw error;
    }
}

const singleAdminById = async (id) => {
    try{
        const admin = await Admin.findByPk(id);

        if(!admin){
            throw new Error("Admin not found");
        }

        return admin;
    }catch(error){
        console.error("Error fetching admin:", error);
        throw error;
    }
}

const newAdmin = async (username, password, role) => {
    try{
        const createdAdmin = await Admin.create({username, password, role});

        return createdAdmin;
    }catch(error){
        console.error("Error creating admin:", error);
        throw error;
    }
}

const putAdmin = async (id, username, password, role) => {
    try{
        const admin = await Admin.findByPk(id);

        if(!admin){
            throw new Error("Admin not found");
        }

        const updatedAdmin = await admin.update({username, password, role});

        return updatedAdmin;
    }catch(error){
        console.error("Error updating admin:", error);
        throw error;
    }
}

const deleteAdmin = async (id) => {
    try{
        const admin = await Admin.findByPk(id);

        if(!admin){
            throw new Error("Admin not found");
        }

        await admin.destroy();

        return admin;
    }catch(error){
        console.error("Error deleting admin:", error);
        throw error;
    }
}

const adminRole = async (id) => {
    try{
        const admin = await Admin.findByPk(id);

        if(!admin){
            throw new Error("Admin not found");
        }

        return admin.role;
    }catch(error){
        console.error("Error fetching admin role:", error);
        throw error;
    }
}

const putAdminRole = async (id, role) => {
    try{
        const admin = await Admin.findByPk(id);

        if(!admin){
            throw new Error("Admin not found");
        }

        await admin.update({role});

        const updatedAdmin = await Admin.findByPk(id);

        return updatedAdmin;
    }catch(error){
        console.error("Error updating admin role:", error);
        throw error;
    }
}

const specificRoleAdmin = async (role) => {
    try{
        const roleAdmins = await Admin.findAll({
            where: {
                role
            }
        });

        if(!roleAdmins){
            throw new Error("No admins found with this role");
        }

        return roleAdmins;
    }catch(error){
        console.error("Error fetching admins with this role:", error);
        throw error;
    }
}

const adminIsActive = async (id) => {
    try{
        const admin = await Admin.findByPk(id);

        if(!admin){
            throw new Error("Admin not found");
        }

        return admin.isActive;
    }catch(error){
        console.error("Error fetching admin status:", error);
        throw error;
    }
}

const putAdminActive = async (id, isActive) => {
    try{
        const admin = await Admin.findByPk(id);

        if(!admin){
            throw new Error("Admin not found");
        }

        await admin.update({isActive});

        const updatedAdmin = await Admin.findByPk(id);

        return updatedAdmin;
    }catch(error){
        console.error("Error updating admin status:", error);
        throw error;
    }
}

const putAdminStatus = async (id, status) => {
    try{
        const admin = await Admin.findByPk(id);

        if(!admin){
            throw new Error("Admin not found");
        }

        await admin.update({status});

        const updatedAdmin = await Admin.findByPk(id);

        return updatedAdmin;
    }catch(error){
        console.error("Error updating admin status:", error);
        throw error;
    }
}

const activeAdmins = async () => {
    try{
        const admins = await Admin.findAll({
            where: {
                isActive: true
            }
        });

        if(!admins){
            throw new Error("No active admins found");
        }

        return admins;
    }catch(error){
        console.error("Error fetching active admins:", error);
        throw error;
    }
}

const inactiveAdmins = async () => {
    try{
        const admins = await Admin.findAll({
            where: {
                isActive: false
            }
        });

        if(!admins){
            throw new Error("No inactive admins found");
        }

        return admins;
    }catch(error){
        console.error("Error fetching inactive admins:", error);
        throw error;
    }
}  

module.exports = {
    allAdmins,
    singleAdminById,
    newAdmin,
    putAdmin,
    deleteAdmin,
    adminRole,
    putAdminRole,
    specificRoleAdmin,
    adminIsActive,
    putAdminStatus,
    activeAdmins,
    inactiveAdmins,
    putAdminActive
}