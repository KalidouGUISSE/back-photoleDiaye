import { PrismaClient } from "@prisma/client";
import { IAuthRepository } from "./interfaces/IAuthRepository.js";
import { User } from "../../types/index.js";

const prisma = new PrismaClient();

export class AuthRepository implements IAuthRepository {
  // async createUser(email: string, hashedPassword: string): Promise<void> {
  //   await prisma.user.create({ data: { email, password: hashedPassword } });
  // }

  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async findUserById(userId: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id: userId } });
  }

  async saveRefreshToken(userId: string, token: string): Promise<void> {
    await prisma.user.update({ where: { id: userId }, data: { refreshToken: token } });
  }

  async removeRefreshToken(userId: string): Promise<void> {
    await prisma.user.update({ where: { id: userId }, data: { refreshToken: null } });
  }
}
