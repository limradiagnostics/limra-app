import { Router } from "express";
import * as billControllers from "../controllers/bill.controller";

const billRouter = Router();

billRouter.post("/generate", billControllers.generateBillController);

billRouter.get("/all", billControllers.fetchAllBillsController);

billRouter.put("/edit/:id", billControllers.updateBillController);

billRouter.delete("/delete/:id", billControllers.deleteBillController);

export default billRouter;
