import { Router } from 'express';
import authRouter from './auth.routes';
import usersRouter from './users.routes';
import messagesRouter from './messages.routes';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/messages', messagesRouter);

export default router;
