// import { AuthController } from "../auth/AuthController.js";
// import { AuthService } from "../auth/AuthService.js";
// import { AuthRepository } from "../auth/AuthRepository.js";

// const router = express.Router();
// const authController = new AuthController(new AuthService(new AuthRepository()));


import { Router } from "express";
import { UserController } from "./UserController.js";
import { UserService } from "./UserService.js";
import { UserRepository } from "./UserRepository.js";
import { verifyAccessToken } from "../../middleware/verifyAccessToken.js";
import { isModerator } from "../../middleware/isModerator.js";

const router = Router();

// Injection de dépendances
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);


/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Enregistrer un nouvel utilisateur
 *     tags: [Utilisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Adresse email de l'utilisateur
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: Mot de passe (minimum 6 caractères)
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                       enum: [USER, VIP, MODERATOR]
 *       400:
 *         description: Données invalides
 *       409:
 *         description: Email déjà utilisé
 */
router.post("/register", (req, res) => userController.register(req, res));


/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Obtenir le profil de l'utilisateur connecté
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                   enum: [USER, VIP, MODERATOR]
 *       401:
 *         description: Non authentifié
 */

// 👤 Routes utilisateur standard
// Profil de l'utilisateur connecté
router.get("/profile", verifyAccessToken, (req, res) =>
  userController.getProfile(req, res)
);

/**
 * @swagger
 * /user/list:
 *   get:
 *     summary: Lister tous les utilisateurs (modérateurs uniquement)
 *     tags: [Utilisateurs, Modération]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       403:
 *         description: Accès réservé aux modérateurs
 */
router.get("/list", verifyAccessToken, isModerator, (req, res) =>
  userController.listUsers(req, res)
);

/**
 * @swagger
 * /user/{userId}/promote-vip:
 *   patch:
 *     summary: Promouvoir un utilisateur en VIP
 *     tags: [Utilisateurs, Modération]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur promu en VIP
 *       403:
 *         description: Accès réservé aux modérateurs
 *       404:
 *         description: Utilisateur non trouvé
 */
router.patch("/:userId/promote-vip", verifyAccessToken, isModerator, (req, res) =>
  userController.promoteToVIP(req, res)
);

/**
 * @swagger
 * /user/{userId}/demote-vip:
 *   patch:
 *     summary: Rétrograder un VIP en utilisateur normal
 *     tags: [Utilisateurs, Modération]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur rétrogradé
 *       403:
 *         description: Accès réservé aux modérateurs
 *       404:
 *         description: Utilisateur non trouvé
 */
router.patch("/:userId/demote-vip", verifyAccessToken, isModerator, (req, res) =>
  userController.demoteFromVIP(req, res)
);

export default router;