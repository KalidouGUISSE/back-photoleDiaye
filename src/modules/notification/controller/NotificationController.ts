import type { Request, Response } from "express";
import type { INotificationService } from "../interfaces/INotificationService.js";

export class NotificationController {
  constructor(private readonly notificationService: INotificationService) {}

  async listerNotifications(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ error: "Utilisateur non authentifié" });
        return;
      }

      const notifications = await this.notificationService.listerNotificationsUtilisateur(userId);
      res.json({
        notifications,
        total: notifications.length,
        nonLues: notifications.filter(n => !n.isRead).length
      });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des notifications" });
    }
  }

  async marquerCommeVue(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ error: "ID de notification requis" });
        return;
      }

      await this.notificationService.marquerNotificationCommeVue(id);
      res.json({ message: "Notification marquée comme vue" });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la mise à jour de la notification" });
    }
  }
}