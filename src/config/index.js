import 'dotenv/config';
import Sequelize from 'sequelize';
console.log(`=========================\nWebhook inciado em Node.js na versão: ${process.version}\n=========================\n`);

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
});

// const sequelize = new Sequelize('postgresql://postgres:j58D7htldZM1VQ997q4d@containers-us-west-202.railway.app:6542/railway');

export const secret = process.env.SECRET;