import type { Request, Response } from "express";
import type { IUserController } from "../interfaces/IUserController.js";
import type { IUserService } from "../interfaces/IUserService.js";

export class UserController implements IUserController {
  constructor(private readonly userService: IUserService) {}

  // 👤 Route utilisateur standard - Accès: utilisateur connecté
  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ error: "Utilisateur non authentifié" });
        return;
      }

      const profile = await this.userService.getProfile(userId);
      res.json({ profile });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Erreur lors de la récupération du profil" });
    }
  }

  // 🛡️ Route de modération - Accès: MODERATOR uniquement (middleware isModerator)
  async listUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.listAllUsers();
      res.json({ 
        users,
        total: users.length,
        message: "Liste des utilisateurs récupérée avec succès"
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Erreur lors de la récupération des utilisateurs" });
    }
  }

  // 🛡️ Route de modération - Accès: MODERATOR uniquement (middleware isModerator)
  async promoteToVIP(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        res.status(400).json({ error: "ID utilisateur requis" });
        return;
      }

      await this.userService.promoteToVIP(userId);
      
      res.json({ 
        message: "Utilisateur promu en VIP avec succès",
        userId,
        newRole: "VIP"
      });
    } catch (error: any) {
      if (error.message === "Utilisateur introuvable") {
        res.status(404).json({ error: error.message });
      } else if (error.message === "L'utilisateur est déjà VIP") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message || "Erreur lors de la promotion" });
      }
    }
  }

  // 🛡️ Route de modération - Accès: MODERATOR uniquement (middleware isModerator)
  async demoteFromVIP(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        res.status(400).json({ error: "ID utilisateur requis" });
        return;
      }

      await this.userService.demoteFromVIP(userId);
      
      res.json({ 
        message: "Utilisateur rétrogradé en USER avec succès",
        userId,
        newRole: "USER"
      });
    } catch (error: any) {
      if (error.message === "Utilisateur introuvable") {
        res.status(404).json({ error: error.message });
      } else if (error.message === "L'utilisateur n'est pas VIP") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message || "Erreur lors de la rétrogradation" });
      }
    }
  }
}