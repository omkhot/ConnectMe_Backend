import express from 'express';
import { createNewMsgController, getAllMessagesController } from '../Controller/MsgController.js';

const MsgRouter = express.Router();

MsgRouter.post('/send', createNewMsgController);
MsgRouter.get('/getAll/:chatId', getAllMessagesController);

export default MsgRouter;