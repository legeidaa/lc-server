import { User } from "../db";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middlewares/error";
import { checkReqFields } from "../utils/checkReqFields";

interface CreateUserRequest {
    gameId: number;
    name: string;
    email: string;
    sex: "male" | "female";
    role: "player" | "partner";
}

class UserController {
    create = async (
        req: Request<CreateUserRequest>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { gameId, name, email, sex, role } =
                req.body as CreateUserRequest;

            checkReqFields(next, [gameId, name, email, sex, role]);

            if (sex !== "male" && sex !== "female") {
                throw new ApiError(400, "Invalid sex value");
            }

            if (role !== "player" && role !== "partner") {
                throw new ApiError(400, "Invalid role value");
            }

            const user = await User.create({ gameId, name, email, sex, role });
            res.json(user);
        } catch (error) {
            next(error);
        }
    };

    getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { gameId } = req.params;
            const users = await User.findAll({
                where: { gameId },
            });
            res.json(users);
        } catch (error) {
            next(error);
        }
    };

    // getAll = async (_: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const users = await User.findAll();
    //         res.json(users);
    //     } catch (error) {
    //         if (error instanceof ApiError) {
    //             res.status(error.status).json({ message: error.message });
    //         }
    //         res.status(500).json(error);
    //     }
    // };
}

export const userController = new UserController();
