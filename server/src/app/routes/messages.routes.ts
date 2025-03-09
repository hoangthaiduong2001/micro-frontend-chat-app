import { Router } from 'express';
import { handleGetChatHistory } from '../controllers/messages.controller';

const messagesRouter: Router = Router();

messagesRouter.get('/history/:userId/:receiverId', handleGetChatHistory);

export default messagesRouter;
