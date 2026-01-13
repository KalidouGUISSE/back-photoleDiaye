import type { Request, Response } from "express";
export interface IUserController {
    getProfile(req: Request, res: Response): Promise<void>;
    listUsers(req: Request, res: Response): Promise<void>;
    promoteToVIP(req: Request, res: Response): Promise<void>;
    demoteFromVIP(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=IUserController.d.ts.map