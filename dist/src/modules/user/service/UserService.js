import { Role } from "@prisma/client";
export class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getProfile(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("Utilisateur introuvable");
        }
        return user;
    }
    async listAllUsers() {
        return this.userRepository.findAll();
    }
    async promoteToVIP(userId) {
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
    async demoteFromVIP(userId) {
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
//# sourceMappingURL=UserService.js.map