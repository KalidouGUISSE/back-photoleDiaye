import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class AnnonceRepository {
    async createAnnonce(data) {
        await prisma.annonce.create({ data });
    }
    async findAll() {
        return prisma.annonce.findMany({
            where: { isActive: true, isModerated: true },
            include: {
                user: {
                    select: { role: true, id: true, email: true }
                }
            },
            orderBy: [
                // Priorité VIP : les annonces des utilisateurs VIP en premier
                {
                    user: {
                        role: 'desc' // VIP > USER > MODERATOR (ordre alphabétique inversé)
                    }
                },
                // Puis par date de création (plus récent en premier)
                { createdAt: 'desc' }
            ]
        });
    }
    async findPendingModeration() {
        return prisma.annonce.findMany({
            where: {
                isActive: true,
                isModerated: false // Annonces en attente de modération
            },
            include: {
                user: {
                    select: { role: true, id: true, email: true }
                }
            },
            orderBy: { createdAt: 'asc' } // Plus anciennes en premier pour la modération
        });
    }
    async findById(id) {
        return prisma.annonce.findUnique({ where: { id } });
    }
    async expireOldAnnonces() {
        await prisma.annonce.updateMany({
            where: {
                expiresAt: { lt: new Date() },
                isActive: true,
            },
            data: { isActive: false },
        });
    }
    async moderateAnnonce(id) {
        await prisma.annonce.update({
            where: { id },
            data: { isModerated: true },
        });
    }
    async incrementViews(id) {
        await prisma.annonce.update({
            where: { id },
            data: { views: { increment: 1 } },
        });
    }
    async detectExpiringSoon() {
        const now = new Date();
        const threeDaysLater = new Date();
        threeDaysLater.setDate(now.getDate() + 3);
        return prisma.annonce.findMany({
            where: {
                isActive: true,
                expiresAt: {
                    gte: now,
                    lte: threeDaysLater,
                },
            },
            select: {
                id: true,
                userId: true,
                title: true,
                expiresAt: true,
            },
        });
    }
}
//# sourceMappingURL=AnnonceRepository.js.map