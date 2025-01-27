const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Admin = sequelize.define(
    'Admins', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM("admin", "tester", "superAdmin", "problemSetter", "pending"),
            defaultValue: "pending"
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: true,
        hooks: {
            beforeCreate: async (admin) => {
                const baseUsername = admin.username;
                const nextId = await Admin.max('id');
                const newId = nextId ? nextId + 1 : 1;
                admin.username = `${baseUsername}_${newId}`;
            }
        }
    }
);

module.exports = Admin;