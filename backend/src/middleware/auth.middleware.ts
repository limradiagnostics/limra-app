import { Request, Response, NextFunction } from "express";
import { supabase } from "../lib/supabase";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Missing token",
      });
    }

    const token = authHeader.split(" ")[1];

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
