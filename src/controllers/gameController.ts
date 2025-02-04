import { User } from "../db";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middlewares/error";
import { Game } from "../db/models/Game";
import uuid from "short-uuid";
import { checkReqFields } from "../utils/checkReqFields";

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

    getByHash = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { hash } = req.params;

            const game = await Game.findOne({
                where: {
                    gameHash: hash,
                },
                include: [
                    {
                        model: User,
                    },
                ],
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

    changeCurrentUserRole = async (
        req: Request<{}, {}, { hash: string; roleToUpdate: string }>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { hash, roleToUpdate } = req.body;

            checkReqFields(next, [hash, roleToUpdate]);

            if (!(roleToUpdate === "player" || roleToUpdate === "partner")) {
                throw new ApiError(
                    400,
                    "roleToUpdate value should be player or partner"
                );
            }

            const game = await Game.findOne({
                where: {
                    gameHash: hash,
                },
            });
            if (!game) {
                throw new ApiError(404, "Game not found");
            }

            game.update({ currentUserRole: roleToUpdate });

            res.json(game);
        } catch (error) {
            next(error);
        }
    };
}

export const gameController = new GameController();
