import express from 'express';
import { creteNewChatController, getAllChatsController } from '../Controller/ChatController.js';

const ChatRouter = express.Router();

ChatRouter.post('/create', creteNewChatController);
ChatRouter.get('/getAll/:userId', getAllChatsController);

export default ChatRouter;