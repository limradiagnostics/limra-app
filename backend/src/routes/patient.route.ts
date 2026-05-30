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

patientRouter.get("/", patientController.fetchAllPatientsController);
patientRouter.get("/:phone", patientController.fetchSinglePatientController);

patientRouter.put("/edit/:phone", patientController.updatePatientController);

patientRouter.delete(
  "/delete/:phone",
  patientController.deletePatientController,
);

export default patientRouter;
