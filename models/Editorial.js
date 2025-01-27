const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Problem = require('./Problem');
const Admin = require('./Admin');

const Editorial = sequelize.define('Editorials', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    editorial: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    correctCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    problemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},

{
    timestamps: true
});

Editorial.belongsTo(Problem, {foreignKey: 'problemId'});
Problem.hasMany(Editorial, {foreignKey: 'problemId'});

module.exports = Editorial;