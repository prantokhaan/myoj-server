const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        onDelete: 'CASCADE',
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    displayName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    university: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            const baseUsername = user.username;
            const nextId = await User.max('id');
            const newId = nextId ? nextId + 1 : 1;
            user.username = `${baseUsername}_${newId}`;
        }
    }
});

module.exports = User;