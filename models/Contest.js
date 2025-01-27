const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Contest = sequelize.define(
  'Contests',
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM("created", "problemsAdded", "testCaseAdded", "tested", "started", "ended"),
      defaultValue: "created",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Contest;