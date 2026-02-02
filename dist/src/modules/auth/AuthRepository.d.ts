import { IAuthRepository } from "./interfaces/IAuthRepository.js";
import { User } from "../../types/index.js";
export declare class AuthRepository implements IAuthRepository {
    findUserByEmail(email: string): Promise<User | null>;
    findUserById(userId: string): Promise<User | null>;
    saveRefreshToken(userId: string, token: string): Promise<void>;
    removeRefreshToken(userId: string): Promise<void>;
}
//# sourceMappingURL=AuthRepository.d.ts.map