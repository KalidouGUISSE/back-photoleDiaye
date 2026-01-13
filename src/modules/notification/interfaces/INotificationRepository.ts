export interface INotificationRepository {
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