import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
async function seedModerators() {
    console.log("🌱 Début du seeding des modérateurs...");
    // Créer un modérateur principal (qui peut tout faire)
    const moderatorPassword = await bcrypt.hash("moderator123", 10);
    const moderator = await prisma.user.upsert({
        where: { email: "moderator@ecommerce.com" },
        update: {},
        create: {
            email: "moderator@ecommerce.com",
            password: moderatorPassword,
            role: "MODERATOR"
        }
    });
    // Créer un second modérateur pour la redondance
    const moderator2Password = await bcrypt.hash("mod2_123", 10);
    const moderator2 = await prisma.user.upsert({
        where: { email: "mod2@ecommerce.com" },
        update: {},
        create: {
            email: "mod2@ecommerce.com",
            password: moderator2Password,
            role: "MODERATOR"
        }
    });
    console.log("✅ Modérateurs créés :");
    console.log(`📧 Modérateur principal: ${moderator.email} (${moderator.role})`);
    console.log(`📧 Modérateur backup: ${moderator2.email} (${moderator2.role})`);
    console.log("🔑 Mots de passe: moderator123 / mod2_123");
    console.log("🎯 Pouvoirs: Modération + Gestion VIP + Notifications");
    console.log("⚠️  CHANGEZ CES MOTS DE PASSE EN PRODUCTION !");
}
async function main() {
    try {
        await seedModerators();
    }
    catch (error) {
        console.error("❌ Erreur lors du seeding :", error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=moderators.js.map