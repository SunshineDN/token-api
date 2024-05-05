import express from 'express';
import TokenController from '../controllers/tokenController.js';

const tokenRouter = express.Router();

const tokenController = new TokenController();

export default tokenRouter;