import { PrismaClient, Role } from "@prisma/client";
import type { IUserRepository } from "./interfaces/IUserRepository.js";

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {
  
  async createUser(email: string, hashedPassword: string): Promise<void> {
    await prisma.user.create({ data: { email, password: hashedPassword } });
  }

  async findById(id: string): Promise<any> {
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

  async findAll(): Promise<any[]> {
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

  async updateRole(userId: string, role: Role): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { role }
    });
  }
}
