const express = require('express');
const teste_middleware = require('../middleware/teste_middleware.js');
const TesteController = require('../controllers/teste.js');
const testeRouter = express.Router();

//Tratar body como plain text
testeRouter.use(express.text());
testeRouter.use(teste_middleware);

testeRouter.post('/', TesteController.index);

module.exports = testeRouter;