export interface IAnnonceRepository {
  createAnnonce(data: {
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    userId: string;
    expiresAt: Date;
  }): Promise<void>;

  findAll(): Promise<any[]>;
  
  findPendingModeration(): Promise<any[]>;

  findById(id: string): Promise<any>;

  findByUserId(userId: string): Promise<any[]>;

  expireOldAnnonces(): Promise<void>;

  moderateAnnonce(id: string): Promise<void>;

  rejectAnnonce(id: string): Promise<void>;

 incrementViews(id: string): Promise<void>;

 detectExpiringSoon(): Promise<{ id: string; userId: string; title: string; expiresAt: Date }[]>;


}
