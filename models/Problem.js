const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Contest = require('./Contest');
const Admin = require('./Admin');

const Problem = sequelize.define(
  "Problems",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    statement: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    input: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    output: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    constraints: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sampleInput: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sampleOutput: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timeLimit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    memoryLimit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM("created", "testCaseAdded", "tested"),
      defaultValue: "created",
    },
    contestId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    problemSetter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    problemType: {
      type: DataTypes.ENUM("fixed", "dynamic", "interactive"),
      defaultValue: "fixed",
    },
  },
  {
    timestamps: true,
  }
);


module.exports = Problem;