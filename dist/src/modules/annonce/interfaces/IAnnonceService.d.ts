export interface IAnnonceService {
    publierAnnonce(data: {
        title: string;
        description: string;
        imageUrl: string;
        price: number;
        userId: string;
    }): Promise<void>;
    listerAnnonces(): Promise<any[]>;
    listerAnnoncesEnAttente(): Promise<any[]>;
    modererAnnonce(id: string): Promise<void>;
    verifierExpiration(): Promise<void>;
    consulterAnnonce(id: string): Promise<any>;
    notifierExpirationProche(): Promise<void>;
}
//# sourceMappingURL=IAnnonceService.d.ts.map