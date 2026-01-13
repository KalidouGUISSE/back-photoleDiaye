import type { Request, Response } from "express";
import type { INotificationService } from "../interfaces/INotificationService.js";
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: INotificationService);
    listerNotifications(req: Request, res: Response): Promise<void>;
    marquerCommeVue(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=NotificationController.d.ts.map