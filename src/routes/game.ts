import { Router } from "express";
import { gameController } from "../controllers/gameController";

export const gameRouter = Router();

gameRouter.post("/", gameController.create);
gameRouter.get("/:uuid", gameController.getByUuid);
gameRouter.get("/all", gameController.getAll);
// gameRouter.put('/:uuid', gameController.updateRole)
