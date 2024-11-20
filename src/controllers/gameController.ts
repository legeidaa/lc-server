import { User } from "../db";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middlewares/error";
import { Game } from "../db/models/Game";
import uuid from "short-uuid";
import { Expectation } from "../db/models/Expectation";
import { Action } from "../db/models/Action";

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
        try {
            const { uuid } = req.params;

            const game = await Game.findOne({
                where: {
                    gameHash: uuid,
                },
                include: [{
                    model: User,
                    include: [Action, Expectation],
                }],
            });
            if (!game) {
                next(new ApiError(404, "Game not found"));
            }
            res.json(game);
        } catch (error) {
            next(error);
        }
    };

    getAll = async (_: Request, res: Response, next: NextFunction) => {
        try {
            const games = await Game.findAll({
                include: [User],
            });

            res.json(games);
        } catch (error) {
            next(error);
        }
    };
}

export const gameController = new GameController();
