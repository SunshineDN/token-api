/* eslint-disable no-unused-vars */
const express = require('express');
const sequelize = require('./src/config/database.js');
const cors = require('cors');
const tokenRouter = require('./src/routes/token.js');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use('/auth', tokenRouter);

app.use((req, res, next) => {
  console.log('Endpoint não encontrado!\n');
  res.status(404).json({ message: 'Endpoint não encontrado!' });
});

console.log('Fazendo conexão com o banco de dados...');

// app.listen(PORT, () => {
//   console.log(`\nServidor rodando na porta ${PORT}!\n`);
// });

app.listen(PORT, async () => {
  console.log('Servidor rodando na porta: ' + PORT);
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');

    await sequelize.sync();
    console.log('Tabelas sincronizadas!');
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:');
  }
});