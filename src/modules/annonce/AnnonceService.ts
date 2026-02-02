import type { IAnnonceService } from "./interfaces/IAnnonceService.js";
import type { IAnnonceRepository } from "./interfaces/IAnnonceRepository.js";
import { IUserRepository } from "../user/interfaces/IUserRepository.js";
import { NotificationService } from "../notification/NotificationService.js";
import { NotificationRepository } from "../notification/NotificationRepository.js";

export class AnnonceService implements IAnnonceService {
  private notificationService: NotificationService;

  constructor(
    private readonly annonceRepository: IAnnonceRepository,
    private readonly userRepository: IUserRepository
  ) {
    const notificationRepository = new NotificationRepository();
    this.notificationService = new NotificationService(notificationRepository);
  }

  async publierAnnonce(data: {
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    userId: string;
  }): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Créer l'annonce EN ATTENTE de modération
    await this.annonceRepository.createAnnonce({
      ...data,
      expiresAt,
    });
    
    console.log(`📝 Nouvelle annonce "${data.title}" créée en attente de modération`);
  }

  async listerAnnonces(): Promise<any[]> {
    return this.annonceRepository.findAll();
  }

  async listerAnnoncesEnAttente(): Promise<any[]> {
    return this.annonceRepository.findPendingModeration();
  }

  async listerMesAnnonces(userId: string): Promise<any[]> {
    return this.annonceRepository.findByUserId(userId);
  }

  async modererAnnonce(id: string): Promise<void> {
    await this.annonceRepository.moderateAnnonce(id);
  }

  async approuverAnnonce(id: string): Promise<void> {
    await this.annonceRepository.moderateAnnonce(id);
    console.log(`✅ Annonce ${id} approuvée par un modérateur`);
  }

  async rejeterAnnonce(id: string): Promise<void> {
    await this.annonceRepository.rejectAnnonce(id);
    console.log(`❌ Annonce ${id} rejetée par un modérateur`);
  }

  async verifierExpiration(): Promise<void> {
    await this.annonceRepository.expireOldAnnonces();
  }

  async consulterAnnonce(id: string): Promise<any> {
    await this.annonceRepository.incrementViews(id);
    const annonce = await this.annonceRepository.findById(id);
    const user = await this.userRepository.findById(annonce.userId);

    return {
      ...annonce,
      user,
    };
  }

  async notifierExpirationProche(): Promise<void> {
    const annonces = await this.annonceRepository.detectExpiringSoon();

    for (const annonce of annonces) {
      await this.notificationService.envoyerNotificationExpiration(annonce.userId, annonce);
    }

    if (annonces.length > 0) {
      console.log(`✅ ${annonces.length} notification(s) d'expiration envoyée(s) aux utilisateurs`);
    } else {
      console.log(`ℹ️  Aucune annonce n'expire dans les 3 prochains jours`);
    }
  }
}
