import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class AuthRepository {
    async createUser(email, hashedPassword) {
        await prisma.user.create({ data: { email, password: hashedPassword } });
    }
    async findUserByEmail(email) {
        return prisma.user.findUnique({ where: { email } });
    }
    async findUserById(userId) {
        return prisma.user.findUnique({ where: { id: userId } });
    }
    async saveRefreshToken(userId, token) {
        await prisma.user.update({ where: { id: userId }, data: { refreshToken: token } });
    }
    async removeRefreshToken(userId) {
        await prisma.user.update({ where: { id: userId }, data: { refreshToken: null } });
    }
}
//# sourceMappingURL=AuthRepository.js.map