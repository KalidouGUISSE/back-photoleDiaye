import type { INotificationService } from "./interfaces/INotificationService.js";
import type { INotificationRepository } from "./interfaces/INotificationRepository.js";
export declare class NotificationService implements INotificationService {
    private readonly notificationRepository;
    constructor(notificationRepository: INotificationRepository);
    envoyerNotificationExpiration(userId: string, annonce: any): Promise<void>;
    listerNotificationsUtilisateur(userId: string): Promise<any[]>;
    marquerNotificationCommeVue(notificationId: string): Promise<void>;
}
//# sourceMappingURL=NotificationService.d.ts.map