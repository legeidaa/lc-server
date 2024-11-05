import { User } from "../db";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middlewares/error";
import { checkReqFields } from "../utils/checkReqFields";
import { Action } from "../db/models/Action";
import { Expectation } from "../db/models/Expectation";

interface CreateExpectationRequest {
    userId: number;
    title: string;
}

class ExpectationController {
    create = async (
        req: Request<CreateExpectationRequest>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { userId, title } = req.body as CreateExpectationRequest;

            checkReqFields(next, [userId, title]);
            const expectation = await Expectation.create({
                userId,
                title,
            });
            res.json(expectation);
        } catch (error) {
            next(error);
        }
    };

    getByUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.query as { userId: string };
            const expectations = await Expectation.findAll({
                where: { userId },
            });
            res.json(expectations);
        } catch (error) {
            next(error);
        }
    };
}

export const expectationController = new ExpectationController();
