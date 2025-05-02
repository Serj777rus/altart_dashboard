const { Sequelize } = require('sequelize');
require('dotenv').config();
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 8889,
  }
)

module.exports = sequelize;
