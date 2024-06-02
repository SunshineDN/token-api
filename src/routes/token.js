const express = require('express');
const TokenController = require('../controllers/tokenController.js');
// import token_middleware from '../middleware/token_middleware.js';
// const token_middleware = require('../middleware/token_middleware.js');

const tokenRouter = express.Router();

// tokenRouter.use(token_middleware);

tokenRouter.use(express.json());

tokenRouter.delete('/drop_table', TokenController.dropTable);

tokenRouter.post('/access_token', TokenController.getToken);

tokenRouter.delete('/delete_token', TokenController.deleteToken);

module.exports = tokenRouter;
