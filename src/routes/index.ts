import { Router } from 'express';
import { gameRouter } from './game';
import { userRouter } from './user';

export const routes = Router();

routes.use('/game', gameRouter);
routes.use('/user', userRouter);

