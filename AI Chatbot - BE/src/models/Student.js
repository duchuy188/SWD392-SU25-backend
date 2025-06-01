const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Student = sequelize.define('Student', {
  StudentID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  Birthdate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Grade: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  ITtime: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'Student',
  timestamps: false
});

module.exports = Student;