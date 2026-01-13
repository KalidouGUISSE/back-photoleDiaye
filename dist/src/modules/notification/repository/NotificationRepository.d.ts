import type { INotificationRepository } from "../interfaces/INotificationRepository.js";
export declare class NotificationRepository implements INotificationRepository {
    creerNotification(data: {
        userId: string;
        title: string;
        message: string;
        type: string;
        annonceId?: string;
    }): Promise<void>;
    listerNotificationsUtilisateur(userId: string): Promise<any[]>;
    marquerCommeVue(notificationId: string): Promise<void>;
}
//# sourceMappingURL=NotificationRepository.d.ts.map