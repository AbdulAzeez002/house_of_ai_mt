import jwt from "jsonwebtoken";
import User from "../models/userSchema";
import { NextFunction, Request, Response } from "express";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  console.log( authHeader?.split(" "),'token');
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
   

    try {
      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as jwt.JwtPayload;

      // Get user from the token and attach to request object
      (req as any).user = await User.findById(decoded.id).select("-password");

      if (!(req as any).user) {
        return res.status(401).json({ error: "Unauthorized, token failed" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: "Unauthorized, token failed" });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized, no token" });
  }
};
