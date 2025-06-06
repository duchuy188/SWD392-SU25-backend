const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const School = require("./School");

const Scholarship = sequelize.define(
  "Scholarship",
  {
    ScholarshipID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    EligibilityCriteria: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    SchoolID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: School,
        key: "SchoolID",
      },
    },
    Description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "Scholarship",
    timestamps: false,
  }
);

// Thiết lập quan hệ
Scholarship.belongsTo(School, { foreignKey: "SchoolID" });

module.exports = Scholarship;
