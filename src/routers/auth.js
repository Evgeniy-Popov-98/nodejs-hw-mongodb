import { Router } from 'express';
import { validateBody } from '../middleware/validateBody';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { registerUserController } from '../controllers/auth';
import { registerUserSchema } from '../validation/registerUserSchema';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

export default authRouter;
