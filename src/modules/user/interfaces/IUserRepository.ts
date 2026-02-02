import { Role } from "@prisma/client";

export interface IUserRepository {
  createUser(email: string, hashedPassword: string): Promise<void>;

  // Fonctions de base
  findById(id: string): Promise<any>;
  
  // Fonctions de modération
  findAll(): Promise<any[]>;
  updateRole(userId: string, role: Role): Promise<void>;
}
