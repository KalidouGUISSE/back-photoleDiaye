import type { Request, Response } from "express";
import type { IAnnonceController } from "./interfaces/IAnnonceController.js";
import type { IAnnonceService } from "./interfaces/IAnnonceService.js";
import { annonceSchema } from "./annonce.schema.js";
import { uploadImage } from "../../utils/uploadImage.js";
import { formatZodErrors } from "../../utils/formatZodErrors.js";

export class AnnonceController implements IAnnonceController {
  constructor(private readonly annonceService: IAnnonceService) {}

  async publier(req: Request, res: Response): Promise<void> {
    try {
      const result = annonceSchema.safeParse(req.body);
      if (!result.success) {
        res.status(400).json({ error: formatZodErrors(result.error) });
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
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Erreur lors de la publication de l'annonce" });
    }
  }

  async lister(req: Request, res: Response): Promise<void> {
    try {
      const annonces = await this.annonceService.listerAnnonces();
      res.json(annonces);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Erreur lors de la récupération des annonces" });
    }
  }

  async listerEnAttente(req: Request, res: Response): Promise<void> {
    try {
      const annonces = await this.annonceService.listerAnnoncesEnAttente();
      res.json({
        annonces,
        total: annonces.length,
        message: "Annonces en attente de modération"
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Erreur lors de la récupération des annonces en attente" });
    }
  }

  async moderer(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { action } = req.body;
      
      if (!id) {
        res.status(400).json({ error: "ID de l'annonce requis" });
        return;
      }
      
      if (!action || !['approve', 'reject'].includes(action)) {
        res.status(400).json({ error: "Action invalide. Utilisez 'approve' ou 'reject'" });
        return;
      }
      
      if (action === 'approve') {
        await this.annonceService.approuverAnnonce(id);
        res.json({ message: "Annonce approuvée avec succès" });
      } else {
        await this.annonceService.rejeterAnnonce(id);
        res.json({ message: "Annonce rejetée avec succès" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Erreur lors de la modération de l'annonce" });
    }
  }

  async verifierExpiration(req: Request, res: Response): Promise<void> {
    try {
      await this.annonceService.verifierExpiration();
      res.json({ message: "Annonces expirées vérifiées" });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Erreur lors de la vérification des expirations" });
    }
  }

  async consulter(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ error: "ID de l'annonce requis" });
        return;
      }
      const annonce = await this.annonceService.consulterAnnonce(id);
      res.json(annonce);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Erreur lors de la consultation de l'annonce" });
    }
  }

  async notifierExpiration(req: Request, res: Response): Promise<void> {
    try {
      await this.annonceService.notifierExpirationProche();
      res.json({ message: "Notifications d'expiration envoyées (console)" });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Erreur lors de l'envoi des notifications" });
    }
  }

  async listerMesAnnonces(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ error: "Utilisateur non authentifié" });
        return;
      }
      
      const annonces = await this.annonceService.listerMesAnnonces(userId);
      res.json({
        annonces,
        total: annonces.length,
        message: "Mes annonces récupérées"
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Erreur lors de la récupération des annonces" });
    }
  }
}
