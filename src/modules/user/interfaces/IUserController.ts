import type { Request, Response } from "express";

export interface IUserController {
  // Routes utilisateur standard
  getProfile(req: Request, res: Response): Promise<void>;
  
  // Routes de modération (protégées par middleware isModerator)
  listUsers(req: Request, res: Response): Promise<void>;
  promoteToVIP(req: Request, res: Response): Promise<void>;
  demoteFromVIP(req: Request, res: Response): Promise<void>;
}