import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';

export const handleGetOnlineUsers = (req: Request, res: Response) => {
  return res.json(UsersService.getOnlineUsers());
};
