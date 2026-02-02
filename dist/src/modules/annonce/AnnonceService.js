import { NotificationService } from "../notification/NotificationService.js";
import { NotificationRepository } from "../notification/NotificationRepository.js";
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
    async listerMesAnnonces(userId) {
        return this.annonceRepository.findByUserId(userId);
    }
    async modererAnnonce(id) {
        await this.annonceRepository.moderateAnnonce(id);
    }
    async approuverAnnonce(id) {
        await this.annonceRepository.moderateAnnonce(id);
        console.log(`✅ Annonce ${id} approuvée par un modérateur`);
    }
    async rejeterAnnonce(id) {
        await this.annonceRepository.rejectAnnonce(id);
        console.log(`❌ Annonce ${id} rejetée par un modérateur`);
    }
    async verifierExpiration() {
        await this.annonceRepository.expireOldAnnonces();
    }
    async consulterAnnonce(id) {
        await this.annonceRepository.incrementViews(id);
        const annonce = await this.annonceRepository.findById(id);
        const user = await this.userRepository.findById(annonce.userId);
        return {
            ...annonce,
            user,
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