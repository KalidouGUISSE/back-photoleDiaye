import { Router } from "express";
import { AnnonceController } from "../controller/AnnonceController.js";
import { AnnonceService } from "../service/AnnonceService.js";
import { AnnonceRepository } from "../repository/AnnonceRepository.js";
import { UserRepository } from "../../user/repository/UserRepository.js";
import { verifyAccessToken } from "../../../middleware/verifyAccessToken.js";
import { isModerator } from "../../../middleware/isModerator.js";
import { isVIP } from "../../../middleware/isVIP.js";
import { isNotModerator } from "../../../middleware/isNotModerator.js";

const router = Router();

const repository = new AnnonceRepository();
const userRepository = new UserRepository();
const service = new AnnonceService(repository, userRepository);
const controller = new AnnonceController(service);

/**
 * @swagger
 * /annonce/create:
 *   post:
 *     summary: Créer une nouvelle annonce
 *     tags: [Annonces]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - imageBase64
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 description: Titre de l'annonce
 *               description:
 *                 type: string
 *                 minLength: 10
 *                 description: Description détaillée
 *               imageBase64:
 *                 type: string
 *                 description: Image en base64 (doit commencer par 'data:image/')
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 description: Prix de l'article
 *     responses:
 *       201:
 *         description: Annonce créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: string
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 */

// 🔐 Route protégée par token (UTILISATEURS INSCRITS uniquement, PAS les modérateurs)
router.post("/create", verifyAccessToken, isNotModerator, (req, res) => controller.publier(req, res));

/**
 * @swagger
 * /annonce/list:
 *   get:
 *     summary: Lister toutes les annonces validées
 *     tags: [Annonces]
 *     responses:
 *       200:
 *         description: Liste des annonces
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   imageUrl:
 *                     type: string
 *                   price:
 *                     type: number
 *                   views:
 *                     type: integer
 *                   isActive:
 *                     type: boolean
 *                   expiresAt:
 *                     type: string
 *                     format: date-time
 *                   user:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 */
router.get("/list", (req, res) => controller.lister(req, res));

/**
 * @swagger
 * /annonce/pending:
 *   get:
 *     summary: Lister les annonces en attente de modération
 *     tags: [Annonces, Modération]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Annonces en attente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 annonces:
 *                   type: array
 *                 total:
 *                   type: integer
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès réservé aux modérateurs
 */
router.get("/pending", verifyAccessToken, isModerator, (req, res) => controller.listerEnAttente(req, res));

/**
 * @swagger
 * /annonce/my-annonces:
 *   get:
 *     summary: Lister mes annonces
 *     tags: [Annonces]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Mes annonces
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 annonces:
 *                   type: array
 *                 total:
 *                   type: integer
 */
router.get("/my-annonces", verifyAccessToken, (req, res) => controller.listerMesAnnonces(req, res));

/**
 * @swagger
 * /annonce/moderate/{id}:
 *   patch:
 *     summary: Modérer une annonce (approuver ou rejeter)
 *     tags: [Annonces, Modération]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'annonce
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [approve, reject]
 *     responses:
 *       200:
 *         description: Annonce modérée avec succès
 *       400:
 *         description: Action invalide
 *       403:
 *         description: Accès réservé aux modérateurs
 *       404:
 *         description: Annonce non trouvée
 */
router.patch("/moderate/:id", verifyAccessToken, isModerator, (req, res) => controller.moderer(req, res));

/**
 * @swagger
 * /annonce/{id}:
 *   get:
 *     summary: Consulter une annonce (incrémente les vues)
 *     tags: [Annonces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'annonce
 *     responses:
 *       200:
 *         description: Détails de l'annonce
 *       404:
 *         description: Annonce non trouvée
 */
router.get("/:id", (req, res) => controller.consulter(req, res));

// Routes système (non documentées dans Swagger car internes)
router.patch("/expire", verifyAccessToken, (req, res) => controller.verifierExpiration(req, res));
router.get("/notify-expiring", verifyAccessToken, isModerator, (req, res) => controller.notifierExpiration(req, res));
router.get("/system/notify-expiring", verifyAccessToken, (req, res) => controller.notifierExpiration(req, res));



export default router;
