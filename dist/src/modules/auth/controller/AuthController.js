import { registerSchema, loginSchema, refreshSchema } from "../validation/auth.schema.js";
export class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(req, res) {
        try {
            // Validation des données d'entrée
            const validatedData = registerSchema.parse(req.body);
            const { email, password } = validatedData;
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
            const validatedData = loginSchema.parse(req.body);
            const { email, password } = validatedData;
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
            const validatedData = refreshSchema.parse(req.body);
            const { refreshToken } = validatedData;
            const newAccessToken = await this.authService.refreshAccessToken(refreshToken);
            res.json({ accessToken: newAccessToken });
        }
        catch (err) {
            const error = err;
            res.status(400).json({ error: error.message });
        }
    }
    async logout(req, res) {
        const { userId } = req.body;
        try {
            await this.authService.logout(userId);
            res.json({ message: "Déconnexion réussie" });
        }
        catch (err) {
            const error = err;
            res.status(400).json({ error: error.message });
        }
    }
}
//# sourceMappingURL=AuthController.js.map