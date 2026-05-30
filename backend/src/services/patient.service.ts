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

export const fetchAllPatientsService = async (type: PatientType) => {
  return await prisma.patient.findMany({
    where: {
      type,
    },
  });
};

export const fetchSinglePatientService = async (phone: string) => {
  const contact = Number(phone);
  return await prisma.patient.findUnique({
    where: {
      phone: contact,
    },
  });
};

export const updatePatientService = async (
  name: string,
  address: {
    home: string;
    localArea: string;
    pincode: number;
    city: string;
    state: string;
  },
  phone: string,
  aadharNumber: number,
  progenies: [
    {
      gender: string;
      age: number;
    },
  ],
  husbandName: string,
  type: PatientType,
) => {
  const contact = Number(phone);

  const existing = await prisma.patient.findUnique({
    where: {
      phone: contact,
    },
  });
  if (!existing) throw new Error("Patient account does not exist");

  const patient = await prisma.patient.update({
    where: {
      phone: contact,
    },
    data: {
      name,
      address,
      phone: contact,
      aadharNumber,
      progenies,
      husbandName,
      type,
    },
  });

  return patient;
};

export const deletePatientService = async (phone: string) => {
  const contact = Number(phone);

  const patient = await prisma.patient.delete({
    where: {
      phone: contact,
    },
  });

  return patient;
};
