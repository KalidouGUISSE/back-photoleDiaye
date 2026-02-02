import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import annonceRoutes from "./modules/annonce/annonce.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import notificationRoutes from "./modules/notification/notification.routes.js";
import "./types/index.js";
import cron from "node-cron";
import axios from "axios";
import { swaggerUi, specs } from "./swagger.js";
dotenv.config();
const app = express();
const baseUrl = process.env.API_URL;
// CORS configuration - temporarily allow all origins for debugging
app.use(cors({
    origin: true, // Allow all origins
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200
}));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/annonce", annonceRoutes);
app.use("/user", userRoutes);
app.use("/notification", notificationRoutes);
// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/api-docs.json', (req, res) => res.json(specs));
// Tâche CRON qui s'exécute tous les lundis à 2h
cron.schedule("0 2 * * 1", async () => {
    try {
        console.log("🤖 Démarrage de la tâche hebdomadaire...");
        // 1. D'abord, envoyer les notifications d'expiration
        console.log("📧 Envoi des notifications d'expiration...");
        await axios.get(`${baseUrl}/annonce/system/notify-expiring`, {
            headers: { Authorization: `Bearer ${process.env.SYSTEM_TOKEN}` },
        });
        // 2. Ensuite, supprimer les annonces expirées
        console.log("🗑️ Suppression des annonces expirées...");
        await axios.patch(`${baseUrl}/annonce/expire`, null, {
            headers: { Authorization: `Bearer ${process.env.SYSTEM_TOKEN}` },
        });
        console.log("✅ Tâche hebdomadaire terminée avec succès");
    }
    catch (error) {
        console.error("❌ Erreur lors de la tâche hebdomadaire:", error.message);
    }
});
// Tâche CRON quotidienne à 18h pour les notifications urgentes
cron.schedule("0 18 * * *", async () => {
    try {
        console.log("🚨 Vérification quotidienne des annonces qui expirent bientôt...");
        await axios.get(`${baseUrl}/annonce/system/notify-expiring`, {
            headers: { Authorization: `Bearer ${process.env.SYSTEM_TOKEN}` },
        });
    }
    catch (error) {
        console.error("❌ Erreur lors de la notification quotidienne:", error.message);
    }
});
app.listen(3000, () => {
    console.log(`🚀 Serveur lancé sur ${baseUrl}`);
});
//# sourceMappingURL=server.js.map