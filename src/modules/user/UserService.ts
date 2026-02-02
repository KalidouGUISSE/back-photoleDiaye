import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { IUserService } from "./interfaces/IUserService.js";
import type { IUserRepository } from "./interfaces/IUserRepository.js";
import { Role } from "@prisma/client";

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

    async register(email: string, password: string): Promise<void> {
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.userRepository.createUser(email, hashedPassword);
    }

  async getProfile(userId: string): Promise<any> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("Utilisateur introuvable");
    }
    return user;
  }

  async listAllUsers(): Promise<any[]> {
    return this.userRepository.findAll();
  }

  async promoteToVIP(userId: string): Promise<void> {
    // Vérifier que l'utilisateur existe
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("Utilisateur introuvable");
    }

    if (user.role === Role.VIP) {
      throw new Error("L'utilisateur est déjà VIP");
    }

    await this.userRepository.updateRole(userId, Role.VIP);
  }

  async demoteFromVIP(userId: string): Promise<void> {
    // Vérifier que l'utilisateur existe
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("Utilisateur introuvable");
    }

    if (user.role !== Role.VIP) {
      throw new Error("L'utilisateur n'est pas VIP");
    }

    await this.userRepository.updateRole(userId, Role.USER);
  }
}