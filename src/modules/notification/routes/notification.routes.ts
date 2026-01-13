import { Router } from "express";
import { NotificationController } from "../controller/NotificationController.js";
import { NotificationService } from "../service/NotificationService.js";
import { NotificationRepository } from "../repository/NotificationRepository.js";
import { verifyAccessToken } from "../../../middleware/verifyAccessToken.js";

const router = Router();

const repository = new NotificationRepository();
const service = new NotificationService(repository);
const controller = new NotificationController(service);

/**
 * @swagger
 * /notification:
 *   get:
 *     summary: Lister les notifications de l'utilisateur connecté
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des notifications
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
 *                   message:
 *                     type: string
 *                   type:
 *                     type: string
 *                   isRead:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Non authentifié
 */
router.get("/", verifyAccessToken, (req, res) => controller.listerNotifications(req, res));

/**
 * @swagger
 * /notification/{id}/read:
 *   patch:
 *     summary: Marquer une notification comme lue
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la notification
 *     responses:
 *       200:
 *         description: Notification marquée comme lue
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Notification non trouvée
 */
router.patch("/:id/read", verifyAccessToken, (req, res) => controller.marquerCommeVue(req, res));

export default router;