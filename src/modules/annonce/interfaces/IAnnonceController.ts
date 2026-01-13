import type { Request, Response } from "express";

export interface IAnnonceController {
  publier(req: Request, res: Response): Promise<void>;
  lister(req: Request, res: Response): Promise<void>;
  moderer(req: Request, res: Response): Promise<void>;
  verifierExpiration(req: Request, res: Response): Promise<void>;
  consulter(req: Request, res: Response): Promise<void>;
  notifierExpiration(req: Request, res: Response): Promise<void>;


}
