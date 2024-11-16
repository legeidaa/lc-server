import type { Request, Response, NextFunction } from "express";

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
    console.log(
        "ERR NAME: \n",
        err.name,
        "\nERR MESSAGE: \n",
        err.message,
        "\nERR CAUSE: \n",
        err.cause,
        "\nERR STACK: \n",
        err.stack
    );

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
