const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Admin = sequelize.define('Admin', {
  AdminID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  Role: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'Admin',
  timestamps: false
});

module.exports = Admin;