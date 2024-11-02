import { User } from "../db";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middlewares/error";
import { Game } from "../db/models/Game";
import uuid from "short-uuid";

interface CreateGameRequest {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

class GameController {
    create = async (_: Request, res: Response, next: NextFunction) => {
        try {
            const game = await Game.create({
                gameHash: uuid.generate(),
            });
            res.json(game);
        } catch (error) {
            next(error);
        }
    };
    
    getByUuid = async (req: Request, res: Response, next: NextFunction) => {
        const { uuid } = req.params;
        try {
            const game = await Game.findOne({
                where: {
                    gameHash: uuid,
                },
                include: [User],
            });
            if (!game) {
                throw new ApiError(404, "Game not found");
            }
            res.json(game);
        } catch (error) {
            next(error);
        }
    };
}

export const gameController = new GameController();
