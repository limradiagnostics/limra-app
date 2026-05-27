import { Request, Response } from "express";
import * as clinicServices from "../services/clinic.service";

export const syncUserController = async (req: Request, res: Response) => {
  const { supabaseId, name, email, profilePictureUrl } = req.body;
  const data = { supabaseId, name, email, profilePictureUrl };

  if (!data) {
    console.log("Required fields are missing");
    return res.status(404).json("Required fields are missing");
  }

  try {
    const clinic = await clinicServices.syncUserService(
      supabaseId,
      name,
      email,
      profilePictureUrl,
    );
    res.status(201).json({ message: "Supabase clinic account sync", clinic });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

export const fetchClinicUserController = async (
  req: Request,
  res: Response,
) => {
  const { supabaseId } = req.params;

  if (!supabaseId) {
    console.log("Provide supabase ID");
    return res.status(404).json("Provide supabase ID");
  }

  try {
    const clinic = await clinicServices.fetchClinicUserService(
      supabaseId as string,
    );
    res.status(200).json({ clinic });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json(error.message);
  }
};
