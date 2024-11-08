import { User } from "../db";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middlewares/error";
import { checkReqFields } from "../utils/checkReqFields";
import { Action } from "../db/models/Action";

const ActionType = ["green", "yellow", "blue", "gray"] as const;
type ActionType = (typeof ActionType)[number];
const isActionType = (value: unknown): value is ActionType => {
    return ActionType.includes(value as ActionType);
};

interface CreateActionRequest {
    userId: number;
    title: string;
    type: ActionType;
}

class ActionController {
    create = async (
        req: Request<CreateActionRequest>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { userId, title, type } = req.body as CreateActionRequest;

            checkReqFields(next, [userId, title, type]);

            if (isActionType(type) === false) {
                throw new ApiError(400, "Invalid type value");
            }
            const action = await Action.create({
                userId,
                title,
                type,
                cost: null,
            });
            res.json(action);
        } catch (error) {
            next(error);
        }
    };

    getByType = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId, type } = req.query as {
                userId: string;
                type: string;
            };
            
            const actions = await Action.findAll({
                where: { userId, type },
            });
            res.json(actions);
        } catch (error) {
            next(error);
        }
    };

    getByUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.query as { userId: string };
            const actions = await Action.findAll({
                where: { userId },
            });
            res.json(actions);
        } catch (error) {
            next(error);
        }
    };
}

export const actionController = new ActionController();
