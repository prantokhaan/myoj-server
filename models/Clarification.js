const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Problem = require('./Problem');
const Contest = require('./Contest');
const User = require('./User');

const Clarification = sequelize.define('Clarifications', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    problemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    contestId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    question: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    answer: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true,
});

Problem.hasMany(Clarification, {foreignKey: 'problemId'});
Clarification.belongsTo(Problem, {foreignKey: 'problemId'});

Contest.hasMany(Clarification, {foreignKey: 'contestId'});
Clarification.belongsTo(Contest, {foreignKey: 'contestId'});

User.hasMany(Clarification, {foreignKey: 'userId'});
Clarification.belongsTo(User, {foreignKey: 'userId'});

module.exports = Clarification;