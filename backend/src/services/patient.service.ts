import { PatientType } from "@prisma/client";
import prisma from "../lib/prisma.orm";

export const registerRegularPatientService = async (
  name: string,
  address: {
    home: string;
    localArea: string;
    pincode: number;
    city: string;
    state: string;
  },
  phone: number,
) => {
  const existing = await prisma.patient.findUnique({
    where: {
      phone,
    },
  });
  if (existing) throw new Error("Patient account already exists");

  const patient = await prisma.patient.create({
    data: {
      name,
      address,
      phone,
      type: PatientType.REGULAR,
    },
  });

  return patient;
};

export const registerOBSPatientService = async (
  name: string,
  address: {
    home: string;
    localArea: string;
    pincode: number;
    city: string;
    state: string;
  },
  phone: number,
  aadharNumber: number,
  progenies: [
    {
      gender: string;
      age: number;
    },
  ],
  husbandName: string,
) => {
  const existing = await prisma.patient.findUnique({
    where: {
      phone,
    },
  });
  if (existing) throw new Error("Patient account already exists");

  const patient = await prisma.patient.create({
    data: {
      name,
      address,
      phone,
      aadharNumber,
      progenies,
      husbandName,
      type: PatientType.OBS,
    },
  });

  return patient;
};
