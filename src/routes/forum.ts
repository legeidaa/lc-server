import { Router } from 'express';
import { userController } from '../controllers/userController';

export const forum = Router();

// forum.post('/user', userController.create);
// forum.get('/user', userController.getOne); // ?user_id=
forum.get('/users', userController.getAll);
