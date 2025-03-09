import { Router } from 'express';
import { handleGetOnlineUsers } from '../controllers/users.controller';

const usersRouter: Router = Router();

usersRouter.get('/online', handleGetOnlineUsers);

export default usersRouter;
