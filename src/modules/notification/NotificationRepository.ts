import { PrismaClient } from "@prisma/client";
import type { INotificationRepository } from "./interfaces/INotificationRepository.js";

const prisma = new PrismaClient();

export class NotificationRepository implements INotificationRepository {
  async creerNotification(data: {
    userId: string;
    title: string;
    message: string;
    type: string;
    annonceId?: string;
  }): Promise<void> {
    await prisma.notification.create({ data });
  }

  async listerNotificationsUtilisateur(userId: string): Promise<any[]> {
    return prisma.notification.findMany({
      where: { userId },
      include: {
        annonce: {
          select: {
            id: true,
            title: true,
            expiresAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async marquerCommeVue(notificationId: string): Promise<void> {
    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true }
    });
  }
}