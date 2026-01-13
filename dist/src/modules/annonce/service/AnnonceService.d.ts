import type { IAnnonceService } from "../interfaces/IAnnonceService.js";
import type { IAnnonceRepository } from "../interfaces/IAnnonceRepository.js";
import { IUserRepository } from "../../user/interfaces/IUserRepository.js";
export declare class AnnonceService implements IAnnonceService {
    private readonly annonceRepository;
    private readonly userRepository;
    private notificationService;
    constructor(annonceRepository: IAnnonceRepository, userRepository: IUserRepository);
    publierAnnonce(data: {
        title: string;
        description: string;
        imageUrl: string;
        price: number;
        userId: string;
    }): Promise<void>;
    listerAnnonces(): Promise<any[]>;
    listerAnnoncesEnAttente(): Promise<any[]>;
    listerMesAnnonces(userId: string): Promise<any[]>;
    modererAnnonce(id: string): Promise<void>;
    approuverAnnonce(id: string): Promise<void>;
    rejeterAnnonce(id: string): Promise<void>;
    verifierExpiration(): Promise<void>;
    consulterAnnonce(id: string): Promise<any>;
    notifierExpirationProche(): Promise<void>;
}
//# sourceMappingURL=AnnonceService.d.ts.map