import { User } from "../db";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middlewares/error";
import { checkReqFields } from "../utils/checkReqFields";
import { Action } from "../db/models/Action";
import { Expectation } from "../db/models/Expectation";

type CreateExpectationRequest = {
    userId: number;
    title: string;
};

type UpdateExpectationsRequest = {
    expectationId: number;
} & CreateExpectationRequest;

class ExpectationController {
    create = async (
        req: Request<{}, {}, CreateExpectationRequest[]>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const body = req.body;

            if (Array.isArray(body) === false) {
                throw new ApiError(400, "Request body must be array");
            }
            body.forEach((expectation) => {
                checkReqFields(next, [expectation.userId, expectation.title]);
            });
            const expectation = await Expectation.bulkCreate(body);
            res.json(expectation);
        } catch (error) {
            next(error);
        }
    };

    getByUser = async (
        req: Request<{}, {}, {}, { userId: string }>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { userId } = req.query;
            if (userId === "undefined") {
                throw new ApiError(400, "userId must be number");
            }

            checkReqFields(next, [userId]);
            const expectations = await Expectation.findAll({
                where: { userId }, order: [["expectationId", "ASC"]],
            });
            res.json(expectations);
        } catch (error) {
            next(error);
        }
    };

    update = async (
        req: Request<{}, {}, UpdateExpectationsRequest[]>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const body = req.body;

            if (Array.isArray(body) === false) {
                throw new ApiError(400, "Request body must be array");
            }
            body.forEach((expectation) => {
                checkReqFields(next, [
                    expectation.expectationId,
                    expectation.userId,
                    expectation.title,
                ]);
            });

            const expectations = await Expectation.bulkCreate(body, {
                updateOnDuplicate: ["title"],
            });

            res.json(expectations);
        } catch (error) {
            next(error);
        }
    };

    delete = async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;            
            const expectation = await Expectation.findByPk(id);
            
            if (!expectation) {
                throw new ApiError(404, "Expectation not found");
            }
            await expectation.destroy();
            res.json({ success: true, id: id });
        } catch (error) {
            next(error);
        }
    };
}

export const expectationController = new ExpectationController();
