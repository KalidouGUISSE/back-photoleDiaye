import { NotificationService } from "../../notification/service/NotificationService.js";
import { NotificationRepository } from "../../notification/repository/NotificationRepository.js";
export class AnnonceService {
    annonceRepository;
    userRepository;
    notificationService;
    constructor(annonceRepository, userRepository) {
        this.annonceRepository = annonceRepository;
        this.userRepository = userRepository;
        const notificationRepository = new NotificationRepository();
        this.notificationService = new NotificationService(notificationRepository);
    }
    async publierAnnonce(data) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        // Créer l'annonce EN ATTENTE de modération
        await this.annonceRepository.createAnnonce({
            ...data,
            expiresAt,
        });
        console.log(`📝 Nouvelle annonce "${data.title}" créée en attente de modération`);
    }
    async listerAnnonces() {
        return this.annonceRepository.findAll();
    }
    async listerAnnoncesEnAttente() {
        return this.annonceRepository.findPendingModeration();
    }
    async modererAnnonce(id) {
        await this.annonceRepository.moderateAnnonce(id);
    }
    async verifierExpiration() {
        await this.annonceRepository.expireOldAnnonces();
    }
    async consulterAnnonce(id) {
        await this.annonceRepository.incrementViews(id);
        const annonce = await this.annonceRepository.findById(id);
        const vendeur = await this.userRepository.findById(annonce.userId);
        return {
            ...annonce,
            vendeur,
        };
    }
    async notifierExpirationProche() {
        const annonces = await this.annonceRepository.detectExpiringSoon();
        for (const annonce of annonces) {
            await this.notificationService.envoyerNotificationExpiration(annonce.userId, annonce);
        }
        if (annonces.length > 0) {
            console.log(`✅ ${annonces.length} notification(s) d'expiration envoyée(s) aux utilisateurs`);
        }
        else {
            console.log(`ℹ️  Aucune annonce n'expire dans les 3 prochains jours`);
        }
    }
}
//# sourceMappingURL=AnnonceService.js.map