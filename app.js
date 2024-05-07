/* eslint-disable no-unused-vars */
const express = require('express');
const { sequelize } = require('./src/config/index.js');
const cors = require('cors');
const tokenRouter = require('./src/routes/token.js');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/auth', tokenRouter);

app.use((req, res, next) => {
  console.log('Endpoint não encontrado!\n');
  res.status(404).json({ message: 'Endpoint não encontrado!' });
});

console.log('Fazendo conexão com o banco de dados...');

// app.listen(PORT, () => {
//   console.log(`\nServidor rodando na porta ${PORT}!\n`);
// });

sequelize.sync(
  // { force: true }
).then(() => {
  app.listen(PORT, () => {
    console.log(`\nServidor rodando na porta ${PORT}!\n`);
  });
}).catch((error) => {
  console.log('\nErro ao sincronizar o banco de dados:');
  console.log(error);
});
