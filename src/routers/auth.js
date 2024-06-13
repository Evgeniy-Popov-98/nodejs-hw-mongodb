import { Router } from 'express';
import { validateBody } from '../middleware/validateBody';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { registerUserController } from '../controllers/auth';
import { registerUserSchema } from '../validation/registerUserSchema';
import { loginUserSchema } from '../validation/loginUserSchema';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post('/login', validateBody(loginUserSchema), ctrlWrapper());

export default authRouter;
