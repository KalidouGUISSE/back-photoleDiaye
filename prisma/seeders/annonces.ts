import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedAnnonces() {
  console.log("🌱 Début du seeding des annonces...");

  // Récupérer les utilisateurs existants
  const users = await prisma.user.findMany();

  if (users.length === 0) {
    console.log("❌ Aucun utilisateur trouvé. Exécutez d'abord le seeding des utilisateurs.");
    return;
  }

  const user1 = users[0]!;
  const user2 = (users[1] || users[0])!;
  const user3 = (users[2] || users[0])!;

  const annonces = [
    {
      title: "iPhone 15 Pro Max - Comme neuf",
      description: "iPhone 15 Pro Max 256GB en excellent état, acheté il y a 3 mois. Vendeur VIP de confiance.",
      imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
      price: 1200,
      userId: user1.id
    },
    {
      title: "MacBook Air M2 - État parfait",
      description: "MacBook Air avec puce M2, 16GB RAM, 512GB SSD. Parfait pour les étudiants et professionnels.",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
      price: 1500,
      userId: user2.id
    },
    {
      title: "Voiture Peugeot 308 - 2020",
      description: "Peugeot 308 en excellent état, révision récente, peu de kilomètres.",
      imageUrl: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=500",
      price: 18000,
      userId: user3.id
    }
  ];

  for (const annonceData of annonces) {
    // Vérifier si l'annonce existe déjà
    const existingAnnonce = await prisma.annonce.findFirst({
      where: { title: annonceData.title }
    });

    if (!existingAnnonce) {
      await prisma.annonce.create({
        data: {
          ...annonceData,
          isActive: true,
          isModerated: true,
          views: Math.floor(Math.random() * 100) + 10,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 jours
        }
      });
    }
  }

  console.log(`✅ ${annonces.length} annonces créées`);
}

async function main() {
  try {
    await seedAnnonces();
  } catch (error) {
    console.error("❌ Erreur lors du seeding :", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();