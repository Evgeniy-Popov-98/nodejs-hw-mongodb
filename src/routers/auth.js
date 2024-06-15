import { Router } from 'express';
import { validateBody } from '../middleware/validateBody';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import {
  loginUserController,
  logoutUserController,
  registerUserController,
} from '../controllers/auth';
import { registerUserSchema } from '../validation/registerUserSchema';
import { loginUserSchema } from '../validation/loginUserSchema';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

export default authRouter;
