import type { IUserService } from "./interfaces/IUserService.js";
import type { IUserRepository } from "./interfaces/IUserRepository.js";
export declare class UserService implements IUserService {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    register(email: string, password: string): Promise<void>;
    getProfile(userId: string): Promise<any>;
    listAllUsers(): Promise<any[]>;
    promoteToVIP(userId: string): Promise<void>;
    demoteFromVIP(userId: string): Promise<void>;
}
//# sourceMappingURL=UserService.d.ts.map