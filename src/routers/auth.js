import { Router } from 'express';
import { validateBody } from '../middleware/validateBody';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import {
  loginUserController,
  logoutUserController,
  refreshUserController,
  registerUserController,
} from '../controllers/auth';
import { registerUserSchema } from '../validation/registerUserSchema';
import { loginUserSchema } from '../validation/loginUserSchema';
import { authenticate } from '../middleware/authenticate';

const authRouter = Router();

authRouter.use(authenticate);

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

authRouter.post('/refresh', ctrlWrapper(refreshUserController));

authRouter.post('/logout', ctrlWrapper(logoutUserController));

export default authRouter;
