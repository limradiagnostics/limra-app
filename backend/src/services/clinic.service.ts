import prisma from "../lib/prisma.orm";

export const syncUserService = async (
  supabaseId: string,
  name: string,
  email: string,
  profilePictureUrl: string,
) => {
  const existing = await prisma.clinic.findUnique({
    where: {
      email,
    },
  });
  if (existing) throw new Error("Clinic user already exists");

  const clinic = await prisma.clinic.create({
    data: {
      supabaseId,
      name,
      email,
      profilePictureUrl,
    },
  });

  return clinic;
};
