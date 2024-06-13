import { Router } from 'express';
import { validateBody } from '../middleware/validateBody';
import { ctrlWrapper } from '../utils/ctrlWrapper';

const authRouter = Router();

authRouter.post('/register', validateBody(), ctrlWrapper());

export default authRouter;
