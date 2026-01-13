# Documentation API - Plateforme d'Annonces

## Accès à la documentation Swagger

La documentation interactive de l'API est disponible via Swagger UI :

- **URL** : http://localhost:3000/api-docs
- **JSON brut** : http://localhost:3000/api-docs.json

## Démarrage du serveur

```bash
cd Backend
npm install
npm run dev
```

Le serveur démarrera sur http://localhost:3000 avec la documentation Swagger accessible.

## Authentification

Toutes les routes protégées nécessitent un token JWT dans le header `Authorization: Bearer <token>`.

### Obtenir un token
1. S'inscrire : `POST /auth/register`
2. Se connecter : `POST /auth/login` (retourne `accessToken` et `refreshToken`)

### Rôles utilisateur
- **USER** : Utilisateur standard
- **VIP** : Utilisateur premium
- **MODERATOR** : Modérateur avec droits de gestion

## Modules API

### Authentification (`/auth`)
- `POST /auth/register` - Inscription
- `POST /auth/login` - Connexion
- `POST /auth/refresh` - Rafraîchir token
- `POST /auth/logout` - Déconnexion

### Annonces (`/annonce`)
- `POST /annonce/create` - Créer une annonce (utilisateurs)
- `GET /annonce/list` - Lister annonces validées (public)
- `GET /annonce/pending` - Lister annonces en attente (modérateurs)
- `GET /annonce/my-annonces` - Mes annonces (utilisateur connecté)
- `PATCH /annonce/moderate/{id}` - Modérer une annonce (modérateurs)
- `GET /annonce/{id}` - Détails d'une annonce (public, incrémente vues)

### Utilisateurs (`/user`)
- `GET /user/profile` - Profil utilisateur (connecté)
- `GET /user/list` - Liste utilisateurs (modérateurs)
- `PATCH /user/{userId}/promote-vip` - Promouvoir en VIP (modérateurs)
- `PATCH /user/{userId}/demote-vip` - Rétrograder VIP (modérateurs)

### Notifications (`/notification`)
- `GET /notification` - Lister notifications (connecté)
- `PATCH /notification/{id}/read` - Marquer comme lue (connecté)

## Fonctionnalités clés

- **Modération** : Toutes les annonces passent par validation modérateur
- **Expiration** : Annonces expirent automatiquement (tâches cron)
- **Notifications** : Alertes pour expiration/modération
- **Upload images** : Via Cloudinary (base64)
- **Rôles** : Contrôle d'accès granulaire

## Technologies

- **Backend** : Node.js, TypeScript, Express
- **Base de données** : PostgreSQL, Prisma ORM
- **Authentification** : JWT, bcrypt
- **Validation** : Zod
- **Documentation** : Swagger/OpenAPI 3.0
- **Cloud** : Cloudinary (images)
- **Tâches** : node-cron

## Variables d'environnement

Voir `exemple.env` pour la configuration requise :
- `DATABASE_URL` - Connexion PostgreSQL
- `JWT_SECRET` - Clé JWT accès
- `JWT_REFRESH_SECRET` - Clé JWT refresh
- `CLOUDINARY_*` - Config Cloudinary
- `API_URL` - URL de l'API