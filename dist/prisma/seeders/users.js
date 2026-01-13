import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
async function seedUsers() {
    console.log("🌱 Début du seeding des utilisateurs...");
    // Créer un utilisateur normal
    const userPassword = await bcrypt.hash("user123", 10);
    const user = await prisma.user.upsert({
        where: { email: "user@test.com" },
        update: {},
        create: {
            email: "user@test.com",
            password: userPassword,
            role: "USER"
        }
    });
    // Créer un utilisateur VIP
    const vipPassword = await bcrypt.hash("vip123", 10);
    const vipUser = await prisma.user.upsert({
        where: { email: "vip@test.com" },
        update: {},
        create: {
            email: "vip@test.com",
            password: vipPassword,
            role: "VIP"
        }
    });
    console.log("✅ Utilisateurs créés :");
    console.log(`📧 Utilisateur normal: ${user.email} (${user.role})`);
    console.log(`📧 Utilisateur VIP: ${vipUser.email} (${vipUser.role})`);
    console.log("🔑 Mots de passe: user123 / vip123");
}
async function main() {
    try {
        await seedUsers();
    }
    catch (error) {
        console.error("❌ Erreur lors du seeding :", error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=users.js.map