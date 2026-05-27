import { Router } from "express";
import * as clinicController from "../controllers/clinic.controller";

const clinicRouter = Router();

clinicRouter.post("/account/sync", clinicController.syncUserController);
clinicRouter.get("/account", clinicController.fetchClinicUserController);

export default clinicRouter;
