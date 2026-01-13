import type { Request, Response, NextFunction } from "express";

export function isVIP(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role !== "VIP") {
    return res.status(403).json({ error: "Accès réservé aux VIP" });
  }
  next();
}
