import { Request, Response } from "express";
import * as billServices from "../services/bill.service";

export const generateBillController = async (req: Request, res: Response) => {
  const { patientId, scanType, totalAmount, concession, dueAmount } = req.body;

  const data = { patientId, scanType, totalAmount, concession, dueAmount };
  if (!data) {
    console.log("Required fields are missing");
    return res.status(400).json({ error: "Required fields are missing" });
  }

  try {
    const { patientName, bill } = await billServices.generateBillService(
      patientId,
      scanType,
      totalAmount,
      concession,
      dueAmount,
    );
    res
      .status(201)
      .json({ message: `Bill generated for ${patientName}`, bill });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
