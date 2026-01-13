import type { Request, Response, NextFunction } from "express";

export function isModerator(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role !== "MODERATOR") {
    return res.status(403).json({ error: "Accès réservé aux modérateurs" });
  }
  next();
}
