import { Router } from "express";
import { actionController } from "../controllers/actionController";

export const actionRouter = Router();

actionRouter.post("/", actionController.create);
actionRouter.get("/by-type", actionController.getByType); // ?userId= & type=
actionRouter.get("/by-user", actionController.getByUser); // ?userId=
// actionRouter.patch("/", actionController.update); // ?userId=
