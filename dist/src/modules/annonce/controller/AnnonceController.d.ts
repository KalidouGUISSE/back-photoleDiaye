import type { Request, Response } from "express";
import type { IAnnonceController } from "../interfaces/IAnnonceController.js";
import type { IAnnonceService } from "../interfaces/IAnnonceService.js";
export declare class AnnonceController implements IAnnonceController {
    private readonly annonceService;
    constructor(annonceService: IAnnonceService);
    publier(req: Request, res: Response): Promise<void>;
    lister(req: Request, res: Response): Promise<void>;
    listerEnAttente(req: Request, res: Response): Promise<void>;
    moderer(req: Request, res: Response): Promise<void>;
    verifierExpiration(req: Request, res: Response): Promise<void>;
    consulter(req: Request, res: Response): Promise<void>;
    notifierExpiration(req: Request, res: Response): Promise<void>;
    listerMesAnnonces(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=AnnonceController.d.ts.map