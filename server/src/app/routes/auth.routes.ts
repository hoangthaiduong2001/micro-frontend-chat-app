import { Router } from 'express';
import { handleLogin, handleLogout } from '../controllers/auth.controller';

const authRouter: Router = Router();

authRouter.post('/login', handleLogin);
authRouter.post('/logout', handleLogout);

export default authRouter;
