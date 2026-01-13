import { Role } from "@prisma/client";
import type { IUserRepository } from "../interfaces/IUserRepository.js";
export declare class UserRepository implements IUserRepository {
    findById(id: string): Promise<any>;
    findAll(): Promise<any[]>;
    updateRole(userId: string, role: Role): Promise<void>;
}
//# sourceMappingURL=UserRepository.d.ts.map