import { Router } from 'express';
import contactsRouter from './contactsRouter';

const router = Router();

router.use('/contacts', contactsRouter);
router.use('');

export default router;
