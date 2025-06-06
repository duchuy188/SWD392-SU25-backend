const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const School = sequelize.define(
  "School",
  {
    SchoolID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Location: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Website: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  },
  {
    tableName: "School",
    timestamps: false,
  }
);

module.exports = School;
