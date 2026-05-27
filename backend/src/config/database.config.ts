import prisma from "../lib/prisma.orm";

export const connectToDB = async () => {
  try {
    await prisma.$connect();
    console.log(`Connected to PostgreSQL database`);
  } catch (error: any) {
    console.log(`Error connecting to PostgreSQL database`, error.message);
  }
};
