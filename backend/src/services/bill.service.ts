import { ScanType } from "@prisma/client";
import prisma from "../lib/prisma.orm";

export const generateBillService = async (
  patientId: string,
  scanType: ScanType,
  totalAmount: number,
  concession: number,
  dueAmount: number,
) => {
  const patient = await prisma.patient.findUnique({
    where: {
      id: patientId,
    },
  });

  const bill = await prisma.bill.create({
    data: {
      patientId,
      scanType,
      totalAmount,
      concession,
      dueAmount,
    },
  });

  const patientName = patient?.name;

  return { patientName, bill };
};

export const fetchAllBills = async () => {
  return await prisma.bill.findMany();
};
