import { Router } from "express";
import * as billControllers from "../controllers/bill.controller";

const billRouter = Router();

billRouter.post("/generate", billControllers.generateBillController);

export default billRouter;
