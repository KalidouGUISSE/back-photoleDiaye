# 🚀 Plateforme d'Annonces - API REST

API RESTful complète pour une plateforme de publication et modération d'annonces, développée avec Node.js, TypeScript et Express.

## 📋 Sommaire

- [Présentation](#-présentation)
- [Stack Technique](#-stack-technique)
- [Architecture](#-architecture)
- [Fonctionnalités](#-fonctionnalités)
- [Installation & Démarrage](#-installation--démarrage)
- [Documentation API](#-documentation-api)
- [Endpoints](#-endpoints)
- [Modèles de Données](#-modèles-de-données)
- [Sécurité](#-sécurité)
- [Tâches Automatisées](#-tâches-automatisées)

---

## 🎯 Présentation

Cette API permet de gérer une plateforme d'annonces avec un système complet de :
- Authentification JWT
- Création et gestion d'annonces
- Modération des contenus (approve/reject)
- Système de notifications
- Gestion des rôles (USER, VIP, MODERATOR)

---

## 🛠 Stack Technique

| Technologie | Version | Usage |
|-------------|---------|-------|
| **Node.js** | v18+ | Runtime JavaScript |
| **TypeScript** | v5 | Typage statique |
| **Express** | v5 | Framework web |
| **Prisma** | v6 | ORM base de données |
| **PostgreSQL** | 15+ | Base de données relationnelle |
| **JWT** | v9 | Authentification stateless |
| **Zod** | v4 | Validation des données |
| **Swagger UI** | v5 | Documentation interactive |
| **Node-Cron** | v4 | Planification des tâches |
| **Cloudinary** | v2 | Gestion des images |

---

## 🏗 Architecture

```
src/
├── controllers/     # Logique de traitement des requêtes
├── services/        # Logique métier
├── repositories/    # Accès aux données
├── routes/          # Définition des endpoints
├── middleware/      # Fonctions中间件 (auth, validation)
├── types/           # Types TypeScript personnalisés
├── utils/           # Fonctions utilitaires
└── swagger.ts       # Configuration Swagger
```

### Schéma de l'Architecture

```
┌─────────────┐     HTTP      ┌─────────────┐
│   Client    │ ◄──────────► │   Express   │
└─────────────┘              └──────┬──────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
            ┌───────────┐   ┌───────────┐   ┌───────────┐
            │Controller │   │ Middleware│   │  Swagger  │
            └─────┬─────┘   └───────────┘   └───────────┘
                  │
                  ▼
            ┌───────────┐
            │  Service  │ ◄── Logique métier
            └─────┬─────┘
                  │
                  ▼
            ┌───────────┐
            │Repository │ ◄── Accès données (Prisma)
            └─────┬─────┘
                  │
                  ▼
            ┌───────────┐
            │ PostgreSQL│
            └───────────┘
```

---

## ✨ Fonctionnalités

### 🔐 Authentication
- Inscription avec validation email unique
- Connexion avec génération de tokens JWT
- Rafraîchissement de token
- Déconnexion

### 📢 Annonces
- Création d'annonces (avec image upload)
- Liste des annonces validées
- Détails d'une annonce (avec compteur de vues)
- Liste de mes annonces
- Liste des annonces en attente de modération

### 🛡 Modération
- Approbation/Rejet d'annonces
- Promotion/Rétrogradation des utilisateurs VIP
- Liste des utilisateurs (modérateurs uniquement)

### 🔔 Notifications
- Création automatique à l'expiration
- Marquage comme lu
- Liste des notifications par utilisateur

---

## 🚀 Installation & Démarrage

### Prérequis

- Node.js v18+
- PostgreSQL v15+
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone <repo-url>
cd Backend

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp exemple.env .env
# Éditer .env avec vos配置

# Initialiser la base de données
npx prisma migrate dev

# Démarrer le serveur en mode développement
npm run dev
```

### Scripts Disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarrage avec rechargement à chaud (tsx) |
| `npm run build` | Compilation TypeScript |
| `npm start` | Démarrage en production |
| `npm run seed` | Population de la base de données |

---

## 📚 Documentation API

La documentation interactive est disponible à : **http://localhost:3000/api-docs**

### Aperçu de la Documentation

![Aperçu Swagger](screenshots/swagger-overview.png)

---

## 🔗 Endpoints

### Authentication

| Méthode | Endpoint | Description | Accès |
|---------|----------|-------------|-------|
| POST | `/auth/register` | Inscription | Public |
| POST | `/auth/login` | Connexion | Public |
| POST | `/auth/refresh` | Rafraîchir le token | Public |
| POST | `/auth/logout` | Déconnexion | Public |

### Annonces

| Méthode | Endpoint | Description | Accès |
|---------|----------|-------------|-------|
| POST | `/annonce/create` | Créer une annonce | User |
| GET | `/annonce/list` | Liste des annonces | Public |
| GET | `/annonce/:id` | Détails d'une annonce | Public |
| GET | `/annonce/my-annonces` | Mes annonces | User |
| GET | `/annonce/pending` | Annonces en attente | Moderator |
| PATCH | `/annonce/moderate/:id` | Modérer une annonce | Moderator |

### Utilisateurs

| Méthode | Endpoint | Description | Accès |
|---------|----------|-------------|-------|
| POST | `/user/register` | Inscription | Public |
| GET | `/user/profile` | Profil utilisateur | User |
| GET | `/user/list` | Liste des utilisateurs | Moderator |
| PATCH | `/user/:userId/promote-vip` | Promouvoir en VIP | Moderator |
| PATCH | `/user/:userId/demote-vip` | Rétrograder de VIP | Moderator |

### Notifications

| Méthode | Endpoint | Description | Accès |
|---------|----------|-------------|-------|
| GET | `/notification` | Liste des notifications | User |
| PATCH | `/notification/:id/read` | Marquer comme lu | User |

---

## 🗃 Modèles de Données

### Utilisateur (User)

```typescript
{
  id: string
  email: string
  password: string
  role: 'USER' | 'VIP' | 'MODERATOR'
  createdAt: DateTime
  updatedAt: DateTime
}
```

### Annonce (Annonce)

```typescript
{
  id: string
  title: string
  description: string
  imageUrl: string
  price: number
  views: number
  isActive: boolean
  expiresAt: DateTime
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  userId: string
  createdAt: DateTime
  updatedAt: DateTime
}
```

### Notification

```typescript
{
  id: string
  title: string
  message: string
  type: 'EXPIRATION' | 'MODERATION' | 'INFO'
  isRead: boolean
  userId: string
  createdAt: DateTime
}
```

---

## 🔒 Sécurité

### Authentification JWT

L'API utilise des tokens JWT pour l'authentification :

```http
Authorization: Bearer <token>
```

### Rôles et Permissions

| Rôle | Permissions |
|------|-------------|
| **USER** | Créer des annonces, voir son profil, gérer ses notifications |
| **VIP** | Même que USER + avantages promotionnels |
| **MODERATOR** | Toutes les permissions + modération, gestion utilisateurs |

### Middleware de Sécurité

- `verifyAccessToken` : Vérifie la présence et la validité du JWT
- `isModerator` : Vérifie que l'utilisateur est modérateur
- `isNotModerator` : Empêche les modérateurs de créer des annonces
- `isVIP` : Réservé aux utilisateurs VIP

---

## ⏰ Tâches Automatisées

L'API utilise node-cron pour automatiser certaines tâches :

| Cron | Description |
|------|-------------|
| `0 2 * * 1` (Chaque lundi 2h) | Expire les annonces et notifie les utilisateurs |
| `0 18 * * *` (Chaque jour 18h) | Notification quotidienne des expirations |

### Tâches Planifiées

1. **Notification d'expiration** : Envoi d'alertes 7 jours avant expiration
2. **Expiration des annonces** : Passage automatique en inactif
3. **Nettoyage** : Archivage des annonces expirées

---

## 🧪 Tests

```bash
# Exécuter les tests
npm test
```

---

## 📦 Variables d'Environnement

```env
# Server
API_URL=http://localhost:3000
PORT=3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# JWT
JWT_SECRET=your-super-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# System
SYSTEM_TOKEN=your-system-token
```

---

## 🚀 Déploiement

### Docker (Recommandé)

```dockerfile
# Exemple de Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/src/server.js"]
```

---

## 📄 Licence

MIT License - voir le fichier LICENSE pour plus de détails.

---

## 👤 Auteur

**Kalidou Guissé** - Développeur Full Stack

---

## 🙏 Remerciements

- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Swagger](https://swagger.io/)
- [JWT](https://jwt.io/)
