import { Router } from "express";
import * as patientController from "../controllers/patient.controller";

const patientRouter = Router();

patientRouter.post(
  "/register/regular",
  patientController.registerRegularPatientController,
);
patientRouter.post(
  "/register/obs",
  patientController.registerOBSPatientController,
);

export default patientRouter;
