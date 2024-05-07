const express = require('express');
const TokenController = require('../controllers/tokenController.js');
// import token_middleware from '../middleware/token_middleware.js';
// const token_middleware = require('../middleware/token_middleware.js');

const tokenRouter = express.Router();

// tokenRouter.use(token_middleware);

const tokenController = new TokenController();

tokenRouter.delete('/drop_table', tokenController.dropTable);

tokenRouter.post('/access_token', tokenController.getToken);

tokenRouter.delete('/delete_token', tokenController.deleteToken);

module.exports = tokenRouter;
