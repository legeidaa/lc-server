import { Router } from "express";
import { userController } from "../controllers/userController";

export const userRouter = Router()

userRouter.post('/', userController.create)
userRouter.get('/:gameId', userController.getUsers)