import express from "express";
import { AuthController } from "../controller/AuthController.js";
import { AuthService } from "../service/AuthService.js";
import { AuthRepository } from "../repository/AuthRepository.js";
const router = express.Router();
const authController = new AuthController(new AuthService(new AuthRepository()));
router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.post("/refresh", (req, res) => authController.refresh(req, res));
router.post("/logout", (req, res) => authController.logout(req, res));
export default router;
//# sourceMappingURL=auth.routes.js.map