import type { Request, Response, NextFunction } from "express";

export function isNotModerator(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role === "MODERATOR") {
    return res.status(403).json({ 
      error: "Les modérateurs ne peuvent pas créer d'annonces. Seuls les utilisateurs inscrits peuvent publier." 
    });
  }
  next();
}