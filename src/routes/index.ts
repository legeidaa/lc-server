import { Router } from 'express';
import { gameRouter } from './game';
import { userRouter } from './user';
import { actionRouter } from './action';
import { expectationRouter } from './expectation';

export const routes = Router();

routes.use('/game', gameRouter);
routes.use('/user', userRouter);
routes.use('/action', actionRouter);
routes.use('/expectation', expectationRouter);

