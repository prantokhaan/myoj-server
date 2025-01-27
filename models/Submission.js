const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Problem = require('./Problem');


const Submission = sequelize.define('Submissions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    code: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    verdict: {
        type: DataTypes.ENUM("Accepted", "Wrong Answer", "Time Limit Exceeded", "Memory Limit Exceeded", "Runtime Error", "Compilation Error", "Internal Error", "Submitted", "Queued", "Running", "Judging", "Pending"),
        defaultValue: "Pending",
    },
    submittedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    problemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    submissionType: {
        type: DataTypes.ENUM("contest", "practice"),
        allowNull: false
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false
    },
    executionTime: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    memoryUsed: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    testCasesPassed: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    testCasesTotal: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    contestId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    results: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    timestamps: true
});

Submission.belongsTo(User, {foreignKey: 'submittedBy'});
Submission.belongsTo(Problem, {foreignKey: 'problemId'});
User.hasMany(Submission, {foreignKey: 'submittedBy'});
Problem.hasMany(Submission, {foreignKey: 'problemId'});

module.exports = Submission;