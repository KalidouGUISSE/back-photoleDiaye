import { User } from "../../../types/index.js";
export interface IAuthRepository {
    createUser(email: string, hashedPassword: string): Promise<void>;
    findUserByEmail(email: string): Promise<User | null>;
    findUserById(userId: string): Promise<User | null>;
    saveRefreshToken(userId: string, token: string): Promise<void>;
    removeRefreshToken(userId: string): Promise<void>;
}
//# sourceMappingURL=IAuthRepository.d.ts.map