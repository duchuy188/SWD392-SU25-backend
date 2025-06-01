const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'AIchatbot',
  process.env.DB_USER || 'sa',
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mssql',
    port: process.env.DB_PORT || 1433,
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true  
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false  
  }
);

module.exports = sequelize;