import { User } from "../db";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middlewares/error";
import { checkReqFields } from "../utils/checkReqFields";
import { Action } from "../db/models/Action";
import { Json } from "sequelize/types/utils";

const ActionType = ["green", "yellow", "blue", "gray"] as const;
type ActionType = (typeof ActionType)[number];
const isActionType = (value: unknown): value is ActionType => {
    return ActionType.includes(value as ActionType);
};

type CreateActionRequest = {
    actionId: number;
    userId: number;
    title: string;
    type: ActionType;
    cost: number;
};

class ActionController {
    createOrUpdate = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const body = req.body as CreateActionRequest[];

            if (Array.isArray(body) === false) {
                throw new ApiError(400, "Request body must be array");
            }
            body.forEach((action) => {
                checkReqFields(next, [
                    action.userId,
                    action.title,
                    action.type,
                ]);

                if (isActionType(action.type) === false) {
                    throw new ApiError(400, "Invalid type value");
                }
            });

            const actions = await Action.bulkCreate(body, {
                updateOnDuplicate: ["title", "cost"],
            });

            res.json(actions);
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

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params as { id: string };
            const action = await Action.findByPk(id);
            if (!action) {
                throw new ApiError(404, "Action not found");
            }
            await action.destroy();
            res.json({ success: true, id: id });
        } catch (error) {
            next(error);
        }
    };
}

export const actionController = new ActionController();
