import { Role } from "@prisma/client";
export interface IUserRepository {
    createUser(email: string, hashedPassword: string): Promise<void>;
    findById(id: string): Promise<any>;
    findAll(): Promise<any[]>;
    updateRole(userId: string, role: Role): Promise<void>;
}
//# sourceMappingURL=IUserRepository.d.ts.map