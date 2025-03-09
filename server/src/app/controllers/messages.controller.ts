import { Request, Response } from 'express';
import { MessagesService } from '../services/messages.service';

export const handleGetChatHistory = (req: Request, res: Response) => {
  const { userId, receiverId } = req.params;

  if (!userId || !receiverId) {
    return res
      .status(400)
      .json({ error: 'Both userId and receiverId are required' });
  }

  const chatHistory = MessagesService.getChatHistory(userId, receiverId);
  return res.json(chatHistory);
};
