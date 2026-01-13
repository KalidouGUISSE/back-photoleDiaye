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

  listerMesAnnonces(userId: string): Promise<any[]>;

  modererAnnonce(id: string): Promise<void>;

  approuverAnnonce(id: string): Promise<void>;

  rejeterAnnonce(id: string): Promise<void>;

  verifierExpiration(): Promise<void>;

  consulterAnnonce(id: string): Promise<any>;
  notifierExpirationProche(): Promise<void>;


}
