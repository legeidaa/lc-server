/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Request, Response, NextFunction } from "express";
import { logError } from "../../src/utils/logError";

export class ApiError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super();
        this.status = status;
        this.message = message;
    }
}

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    logError(err.stack);

    if (err instanceof ApiError) {
        res.status(err.status);
        res.send({
            error: {
                message: err.message,
            },
        });
    }

    res.status(500).send({ message: "Internal Server Error" });
}
