export interface INotificationService {
  envoyerNotificationExpiration(userId: string, annonce: any): Promise<void>;
  listerNotificationsUtilisateur(userId: string): Promise<any[]>;
  marquerNotificationCommeVue(notificationId: string): Promise<void>;
}