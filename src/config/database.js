require('dotenv').config();
const Sequelize = require('sequelize');
console.log(`=========================\nWebhook inciado em Node.js na versão: ${process.version}\n=========================\n`);

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
});

// const sequelize = new Sequelize('postgresql://postgres:j58D7htldZM1VQ997q4d@containers-us-west-202.railway.app:6542/railway');

module.exports = sequelize;
