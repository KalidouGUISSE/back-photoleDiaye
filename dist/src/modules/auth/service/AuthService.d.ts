import { IAuthService } from "../interfaces/IAuthService.js";
import { IAuthRepository } from "../interfaces/IAuthRepository.js";
export declare class AuthService implements IAuthService {
    private readonly authRepository;
    constructor(authRepository: IAuthRepository);
    register(email: string, password: string): Promise<void>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshAccessToken(refreshToken: string): Promise<string>;
    logout(userId: string): Promise<void>;
}
//# sourceMappingURL=AuthService.d.ts.map