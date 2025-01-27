const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Problem = require('./Problem');

const TestCase = sequelize.define('TestCases', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    input: {
        type: DataTypes.STRING,
        allowNull: false
    },
    output: {
        type: DataTypes.STRING,
        allowNull: false
    },
    problemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    customCode: {
        type: DataTypes.STRING,
        allowNull: true
    },

},

{
    timestamps: false
});

TestCase.belongsTo(Problem, {foreignKey: 'problemId'});
Problem.hasMany(TestCase, {foreignKey: 'problemId'});

module.exports = TestCase;