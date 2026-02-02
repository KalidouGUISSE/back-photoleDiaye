import type { Request, Response } from "express";
import type { IAuthService } from "./interfaces/IAuthService.js";
export declare class AuthController {
    private readonly authService;
    constructor(authService: IAuthService);
    login(req: Request, res: Response): Promise<void>;
    refresh(req: Request, res: Response): Promise<void>;
    logout(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=AuthController.d.ts.map