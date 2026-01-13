import jwt from "jsonwebtoken";
import { registerSchema, loginSchema, refreshSchema } from "../validation/auth.schema.js";
import { formatZodErrors } from "../../../utils/formatZodErrors.js";
export class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(req, res) {
        try {
            // Validation des données d'entrée
            const result = registerSchema.safeParse(req.body);
            if (!result.success) {
                res.status(400).json({ error: formatZodErrors(result.error) });
                return;
            }
            const { email, password } = result.data;
            await this.authService.register(email, password);
            res.status(201).json({ message: "Utilisateur créé" });
        }
        catch (err) {
            const error = err;
            res.status(400).json({ error: error.message });
        }
    }
    async login(req, res) {
        try {
            // Validation des données d'entrée
            const result = loginSchema.safeParse(req.body);
            if (!result.success) {
                res.status(400).json({ error: formatZodErrors(result.error) });
                return;
            }
            const { email, password } = result.data;
            const tokens = await this.authService.login(email, password);
            res.json(tokens);
        }
        catch (err) {
            const error = err;
            res.status(400).json({ error: error.message });
        }
    }
    async refresh(req, res) {
        try {
            // Validation des données d'entrée
            const result = refreshSchema.safeParse(req.body);
            if (!result.success) {
                res.status(400).json({ error: formatZodErrors(result.error) });
                return;
            }
            const { refreshToken } = result.data;
            const newAccessToken = await this.authService.refreshAccessToken(refreshToken);
            res.json({ accessToken: newAccessToken });
        }
        catch (err) {
            const error = err;
            res.status(400).json({ error: error.message });
        }
    }
    async logout(req, res) {
        try {
            // Le logout peut être appelé sans token (cas de déconnexion forcée)
            // Si un token est présent, on invalide le refresh token
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                try {
                    const token = authHeader.substring(7);
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    if (decoded.userId) {
                        await this.authService.logout(decoded.userId);
                    }
                }
                catch (tokenError) {
                    // Token invalide ou expiré, on continue quand même le logout
                    console.log('Token invalide lors du logout:', tokenError);
                }
            }
            res.json({ message: "Déconnexion réussie" });
        }
        catch (err) {
            const error = err;
            res.status(400).json({ error: error.message });
        }
    }
}
//# sourceMappingURL=AuthController.js.map