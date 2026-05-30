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
