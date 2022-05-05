import { Router } from 'express';
import { createUser, getUserById } from '../controllers';

const router = Router();

router.post('/', createUser);
router.get('/:id', getUserById);

export const UserRouter = router;
