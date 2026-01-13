import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class NotificationRepository {
    async creerNotification(data) {
        await prisma.notification.create({ data });
    }
    async listerNotificationsUtilisateur(userId) {
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
    async marquerCommeVue(notificationId) {
        await prisma.notification.update({
            where: { id: notificationId },
            data: { isRead: true }
        });
    }
}
//# sourceMappingURL=NotificationRepository.js.map