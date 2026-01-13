import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class UserRepository {
    async findById(id) {
        return prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
    }
    async findAll() {
        return prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true
            },
            orderBy: { createdAt: 'desc' }
        });
    }
    async updateRole(userId, role) {
        await prisma.user.update({
            where: { id: userId },
            data: { role }
        });
    }
}
//# sourceMappingURL=UserRepository.js.map