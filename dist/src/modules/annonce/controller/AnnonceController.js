import { annonceSchema } from "../validation/annonce.schema.js";
import { uploadImage } from "../../../utils/uploadImage.js";
export class AnnonceController {
    annonceService;
    constructor(annonceService) {
        this.annonceService = annonceService;
    }
    async publier(req, res) {
        try {
            const result = annonceSchema.safeParse(req.body);
            if (!result.success) {
                res.status(400).json({ error: result.error.issues });
                return;
            }
            const { title, description, imageBase64, price } = result.data;
            const userId = req.user?.userId;
            if (!userId) {
                res.status(401).json({ error: "Utilisateur non authentifié" });
                return;
            }
            const imageUrl = await uploadImage(imageBase64);
            await this.annonceService.publierAnnonce({
                title,
                description,
                imageUrl,
                price,
                userId,
            });
            res.status(201).json({
                message: "Annonce publiée avec succès - En attente de modération",
                status: "pending_moderation"
            });
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la publication de l'annonce" });
        }
    }
    async lister(req, res) {
        try {
            const annonces = await this.annonceService.listerAnnonces();
            res.json(annonces);
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la récupération des annonces" });
        }
    }
    async listerEnAttente(req, res) {
        try {
            const annonces = await this.annonceService.listerAnnoncesEnAttente();
            res.json({
                annonces,
                total: annonces.length,
                message: "Annonces en attente de modération"
            });
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la récupération des annonces en attente" });
        }
    }
    async moderer(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ error: "ID de l'annonce requis" });
                return;
            }
            await this.annonceService.modererAnnonce(id);
            res.json({ message: "Annonce modérée avec succès" });
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la modération de l'annonce" });
        }
    }
    async verifierExpiration(req, res) {
        try {
            await this.annonceService.verifierExpiration();
            res.json({ message: "Annonces expirées vérifiées" });
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la vérification des expirations" });
        }
    }
    async consulter(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ error: "ID de l'annonce requis" });
                return;
            }
            const annonce = await this.annonceService.consulterAnnonce(id);
            res.json(annonce);
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la consultation de l'annonce" });
        }
    }
    async notifierExpiration(req, res) {
        try {
            await this.annonceService.notifierExpirationProche();
            res.json({ message: "Notifications d'expiration envoyées (console)" });
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de l'envoi des notifications" });
        }
    }
}
//# sourceMappingURL=AnnonceController.js.map