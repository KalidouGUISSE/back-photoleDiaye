import { IAuthService } from "./interfaces/IAuthService.js";
import { IAuthRepository } from "./interfaces/IAuthRepository.js";
export declare class AuthService implements IAuthService {
    private readonly authRepository;
    constructor(authRepository: IAuthRepository);
    login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }>;
    refreshAccessToken(refreshToken: string): Promise<string>;
    logout(userId: string): Promise<void>;
}
//# sourceMappingURL=AuthService.d.ts.map