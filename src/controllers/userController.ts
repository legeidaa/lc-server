import { User } from '../db';
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../middlewares/error';

interface CreateUserRequest {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

class UserController {

  getAll = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController();
