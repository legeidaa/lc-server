import { Router } from "express";
import { actionController } from "../controllers/actionController";

export const actionRouter = Router();

actionRouter.post("/", actionController.createOrUpdate);
actionRouter.get("/by-type", actionController.getByType); // ?userId= & type=
actionRouter.get("/by-user", actionController.getByUser); // ?userId=
