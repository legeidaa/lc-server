import { Router } from "express";
import { userController } from "../controllers/userController";

export const userRouter = Router()

userRouter.post('/', userController.create)
userRouter.post('/pair', userController.createPair)
userRouter.get('/:gameId', userController.getUsers)
userRouter.patch('/resources', userController.changeResources)