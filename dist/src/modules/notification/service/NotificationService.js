export class NotificationService {
    notificationRepository;
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    async envoyerNotificationExpiration(userId, annonce) {
        const joursRestants = Math.ceil((annonce.expiresAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        let message;
        if (joursRestants <= 1) {
            message = `🚨 URGENT : Votre annonce "${annonce.title}" expire aujourd'hui ! 
      
📅 RAPPEL : Toutes les annonces sont automatiquement supprimées chaque lundi pour renouveler les offres.

🔄 Pour continuer à vendre, republiez votre annonce maintenant - elle sera visible 7 jours de plus.
      
💡 Conseil : Republiez régulièrement vos annonces pour maximiser leur visibilité !`;
        }
        else {
            message = `⚠️ Votre annonce "${annonce.title}" expire dans ${joursRestants} jour(s).
      
📅 SYSTÈME : Chaque semaine (tous les lundis), toutes les annonces anciennes sont automatiquement supprimées pour faire place aux nouvelles.

🔄 ACTION REQUISE : Republiez votre annonce avant expiration pour qu'elle reste visible 7 jours de plus.
      
💼 Cela permet de garder la plateforme dynamique avec des offres fraîches !`;
        }
        await this.notificationRepository.creerNotification({
            userId,
            title: joursRestants <= 1 ? "🚨 Republier AUJOURD'HUI !" : "📅 Republication requise bientôt",
            message,
            type: "expiration",
            annonceId: annonce.id
        });
        console.log(`📧 Notification envoyée à l'utilisateur ${userId} pour l'annonce "${annonce.title}" (${joursRestants} jour(s) restant(s))`);
    }
    async listerNotificationsUtilisateur(userId) {
        return this.notificationRepository.listerNotificationsUtilisateur(userId);
    }
    async marquerNotificationCommeVue(notificationId) {
        await this.notificationRepository.marquerCommeVue(notificationId);
    }
}
//# sourceMappingURL=NotificationService.js.map