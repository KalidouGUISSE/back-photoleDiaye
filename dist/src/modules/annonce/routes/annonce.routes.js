import { Router } from "express";
import { AnnonceController } from "../controller/AnnonceController.js";
import { AnnonceService } from "../service/AnnonceService.js";
import { AnnonceRepository } from "../repository/AnnonceRepository.js";
import { UserRepository } from "../../user/repository/UserRepository.js";
import { verifyAccessToken } from "../../../middleware/verifyAccessToken.js";
import { isModerator } from "../../../middleware/isModerator.js";
import { isNotModerator } from "../../../middleware/isNotModerator.js";
const router = Router();
const repository = new AnnonceRepository();
const userRepository = new UserRepository();
const service = new AnnonceService(repository, userRepository);
const controller = new AnnonceController(service);
// 🔐 Route protégée par token (UTILISATEURS INSCRITS uniquement, PAS les modérateurs)
router.post("/create", verifyAccessToken, isNotModerator, (req, res) => controller.publier(req, res));
// 🌍 Route publique - Annonces validées uniquement
router.get("/list", (req, res) => controller.lister(req, res));
// 🛡️ Route protégée - Annonces en attente de modération (MODERATOR uniquement)
router.get("/pending", verifyAccessToken, isModerator, (req, res) => controller.listerEnAttente(req, res));
// 🛡️ Route protégée par token + MODERATOR
router.patch("/moderate/:id", verifyAccessToken, isModerator, (req, res) => controller.moderer(req, res));
// ⏳ Route protégée par token (admin ou CRON)
router.patch("/expire", verifyAccessToken, (req, res) => controller.verifierExpiration(req, res));
// 🔔 Route protégée - Notifications d'expiration (modérateurs uniquement)
router.get("/notify-expiring", verifyAccessToken, isModerator, (req, res) => controller.notifierExpiration(req, res));
// 🤖 Route système pour le CRON - Notifications d'expiration 
router.get("/system/notify-expiring", verifyAccessToken, (req, res) => controller.notifierExpiration(req, res));
// 🌍 Route publique - Consultation d'une annonce (incrémente les vues)
router.get("/:id", (req, res) => controller.consulter(req, res));
export default router;
//# sourceMappingURL=annonce.routes.js.map