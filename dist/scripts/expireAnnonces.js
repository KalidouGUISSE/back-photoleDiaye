import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const token = process.env.SYSTEM_TOKEN;
axios.patch("http://localhost:3000/annonce/expire", null, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})
    .then(() => console.log("✅ Annonces expirées vérifiées"))
    .catch((err) => console.error("❌ Erreur CRON :", err.message));
//# sourceMappingURL=expireAnnonces.js.map