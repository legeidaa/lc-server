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
        req: Request<{}, {}, CreateUserRequest>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { gameId, name, email, sex, role } = req.body;

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

    createPair = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const [player, partner] = req.body as CreateUserRequest[];
            if (req.body.length !== 2 || !player || !partner) {
                throw new ApiError(400, "Invalid request body");
            }

            const usersToCreate = [player, partner].map((user) => {
                checkReqFields(next, [
                    user.gameId,
                    user.email,
                    user.name,
                    user.role,
                    user.sex,
                ]);

                if (user.sex !== "male" && user.sex !== "female") {
                    throw new ApiError(400, "Invalid sex value");
                }

                if (user.role !== "player" && user.role !== "partner") {
                    throw new ApiError(400, "Invalid role value");
                }

                return {
                    gameId: user.gameId,
                    name: user.name,
                    email: user.email,
                    sex: user.sex,
                    role: user.role,
                };
            });

            const user = await User.bulkCreate(usersToCreate);
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

    changeResources = async (
        req: Request<
            {},
            {},
            {
                userId: number;
                hasResources: boolean;
            }
        >,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { userId, hasResources } = req.body;

            checkReqFields(next, [userId, hasResources]);

            if (typeof hasResources !== "boolean") {
                throw new ApiError(400, "hasResources value should be boolean");
            }

            const user = await User.findOne({
                where: { userId },
            });
            if (!user) {
                throw new ApiError(404, "User not found");
            }
            await user?.update({ hasResources });

            res.json(user);
        } catch (error) {
            next(error);
        }
    };

    changeMessage = async (
        req: Request<
            {},
            {},
            {
                userId: number;
                message: string;
            }
        >,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { userId, message } = req.body;

            if (typeof message !== "string") {
                throw new ApiError(400, "message value should be string");
            }

            const user = await User.findOne({
                where: { userId },
            });
            if (!user) {
                throw new ApiError(404, "User not found");
            }
            await user?.update({ message });

            res.json(user);
        } catch (error) {
            next(error);
        }
    };
}

export const userController = new UserController();
