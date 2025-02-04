import { Router } from "express";
import { gameController } from "../controllers/gameController";

export const gameRouter = Router();

gameRouter.post("/", gameController.create);
gameRouter.get("/:hash", gameController.getByHash);
gameRouter.get("/all", gameController.getAll);
gameRouter.patch('/change-role', gameController.changeCurrentUserRole)
