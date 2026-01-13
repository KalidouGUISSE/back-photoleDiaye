import { Router } from "express";
import { NotificationController } from "../controller/NotificationController.js";
import { NotificationService } from "../service/NotificationService.js";
import { NotificationRepository } from "../repository/NotificationRepository.js";
import { verifyAccessToken } from "../../../middleware/verifyAccessToken.js";
const router = Router();
const repository = new NotificationRepository();
const service = new NotificationService(repository);
const controller = new NotificationController(service);
// 🔐 Routes protégées - utilisateur connecté uniquement
router.get("/", verifyAccessToken, (req, res) => controller.listerNotifications(req, res));
router.patch("/:id/read", verifyAccessToken, (req, res) => controller.marquerCommeVue(req, res));
export default router;
//# sourceMappingURL=notification.routes.js.map