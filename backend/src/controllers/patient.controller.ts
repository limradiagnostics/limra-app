import { PatientType } from "@prisma/client";
import * as patientServices from "../services/patient.service";
import { Request, Response } from "express";

export const registerRegularPatientController = async (
  req: Request,
  res: Response,
) => {
  const { name, address, phone } = req.body;

  const data = { name, address, phone };
  if (!data) {
    console.log("Required fields are missing");
    return res.status(404).json({ error: "Required fields are missing" });
  }

  try {
    const patient = await patientServices.registerRegularPatientService(
      name,
      address,
      phone,
    );

    res.status(201).json({ message: "Regular patient registered", patient });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const registerOBSPatientController = async (
  req: Request,
  res: Response,
) => {
  const { name, address, phone, aadharNumber, progenies, husbandName } =
    req.body;

  const data = { name, address, phone, aadharNumber, progenies, husbandName };
  if (!data) {
    console.log("Required fields are missing");
    return res.status(404).json({ error: "Required fields are missing" });
  }

  try {
    const patient = await patientServices.registerOBSPatientService(
      name,
      address,
      phone,
      aadharNumber,
      progenies,
      husbandName,
    );

    res.status(201).json({ message: "OBS patient registered", patient });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const fetchAllPatientsController = async (
  req: Request,
  res: Response,
) => {
  const { type } = req.query;

  if (!type) {
    console.log("Please enter a type of patients to fetch");
    return res
      .status(404)
      .json({ error: "Please enter a type of patients to fetch" });
  }

  try {
    const patients = await patientServices.fetchAllPatientsService(
      type as PatientType,
    );

    res.status(200).json({ total: patients.length, patients });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
