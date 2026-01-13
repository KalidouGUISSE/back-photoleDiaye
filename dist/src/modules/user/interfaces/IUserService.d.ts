export interface IUserService {
    getProfile(userId: string): Promise<any>;
    listAllUsers(): Promise<any[]>;
    promoteToVIP(userId: string): Promise<void>;
    demoteFromVIP(userId: string): Promise<void>;
}
//# sourceMappingURL=IUserService.d.ts.map