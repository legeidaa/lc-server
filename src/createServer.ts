import cors from "cors";
import express, { json, type Express } from "express";
import { errorHandler, logger, notFound } from "./middlewares";
import { routes } from "./routes";

export function createServer(): Express {
    const server = express();

    server.disable("x-powered-by");
    server.use(logger);
    server.use(cors());
    server.use(json());
    server.use("/api", routes);
    server.use(notFound);
    server.use(errorHandler);

    return server;
}
