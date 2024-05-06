import express from 'express';
import TokenController from '../controllers/tokenController.js';

const tokenRouter = express.Router();

const tokenController = new TokenController();

tokenRouter.delete('/drop_table', tokenController.dropTable);

tokenRouter.post('/access_token', tokenController.getToken);

tokenRouter.delete('/delete_token', tokenController.deleteToken);

export default tokenRouter;
