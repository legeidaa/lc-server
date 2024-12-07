import { Router } from "express";
import { expectationController } from "../controllers/expectationsController";

export const expectationRouter = Router();

expectationRouter.post("/", expectationController.create);
expectationRouter.get("/", expectationController.getByUser); // ?userId=
expectationRouter.patch("/", expectationController.update); 
expectationRouter.delete("/:id", expectationController.delete); 
