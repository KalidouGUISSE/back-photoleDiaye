import type { Request, Response } from "express";
import type { IUserController } from "./interfaces/IUserController.js";
import type { IUserService } from "./interfaces/IUserService.js";
export declare class UserController implements IUserController {
    private readonly userService;
    constructor(userService: IUserService);
    register(req: Request, res: Response): Promise<void>;
    getProfile(req: Request, res: Response): Promise<void>;
    listUsers(req: Request, res: Response): Promise<void>;
    promoteToVIP(req: Request, res: Response): Promise<void>;
    demoteFromVIP(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=UserController.d.ts.map