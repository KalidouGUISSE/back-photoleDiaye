import { Router } from "express";
import { UserController } from "../controller/UserController.js";
import { UserService } from "../service/UserService.js";
import { UserRepository } from "../repository/UserRepository.js";
import { verifyAccessToken } from "../../../middleware/verifyAccessToken.js";
import { isModerator } from "../../../middleware/isModerator.js";
const router = Router();
// Injection de dépendances
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
// 👤 Routes utilisateur standard
// Profil de l'utilisateur connecté
router.get("/profile", verifyAccessToken, (req, res) => userController.getProfile(req, res));
// 🛡️ Routes de modération - MODERATOR uniquement
// Lister tous les utilisateurs (pour gestion)
router.get("/list", verifyAccessToken, isModerator, (req, res) => userController.listUsers(req, res));
// Promouvoir un utilisateur en VIP
router.patch("/:userId/promote-vip", verifyAccessToken, isModerator, (req, res) => userController.promoteToVIP(req, res));
// Rétrograder un VIP en utilisateur normal
router.patch("/:userId/demote-vip", verifyAccessToken, isModerator, (req, res) => userController.demoteFromVIP(req, res));
export default router;
//# sourceMappingURL=user.routes.js.map