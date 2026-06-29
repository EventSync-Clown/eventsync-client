# 🍳 EventSync — Backend Next.js

API REST construite avec **Next.js 14 Route Handlers**, **Prisma** et **PostgreSQL**.  
Thème : **Atelier Gastronomique 2025**

---

## 🚀 Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.example .env
# → Éditer .env : DATABASE_URL

# 3. Base de données
npm run db:push     # crée les tables
npm run db:seed     # insère les données de démo

# 4. Lancer
npm run dev         # http://localhost:3001
```

---

## 📡 Endpoints

### 📅 Events
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/events` | Liste tous les événements |
| GET | `/api/events/:id` | Détail d'un événement + sessions |

### 🍳 Sessions
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/sessions` | Liste les sessions (`?eventId=` `?roomId=`) |
| GET | `/api/sessions/live` | Sessions en cours (live) |
| GET | `/api/sessions/:id` | Détail complet + flag `isLive` |

### 💬 Questions
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/sessions/:id/questions` | Questions triées par upvotes |
| POST | `/api/sessions/:id/questions` | Poser une question (live uniquement) |
| PATCH | `/api/questions/:id/upvote` | Upvoter une question |

### 👨‍🍳 Speakers
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/speakers` | Liste tous les chefs |
| GET | `/api/speakers/:id` | Profil d'un chef + ses sessions |

### 🏠 Rooms
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/rooms` | Liste toutes les salles |
| GET | `/api/rooms/:id` | Détail d'une salle + sessions avec `isLive` |

---

## 📦 Format de réponse

```json
// Succès
{ "success": true, "data": { ... } }

// Erreur
{ "success": false, "error": "Message d'erreur" }
```

---

## 📝 POST /api/sessions/:id/questions

```json
{
  "content": "Quel couteau utiliser pour la brunoise ?",
  "authorName": "Sophie"
}
```
> `authorName` est optionnel — la question sera anonyme si absent.  
> La route retourne **403** si la session n'est pas live.

---

## 🏗️ Architecture

```
src/
├── app/
│   ├── page.tsx                         ← Documentation des endpoints
│   ├── layout.tsx
│   └── api/
│       ├── events/
│       │   ├── route.ts                 GET /api/events
│       │   └── [id]/route.ts            GET /api/events/:id
│       ├── sessions/
│       │   ├── route.ts                 GET /api/sessions
│       │   ├── live/route.ts            GET /api/sessions/live
│       │   └── [id]/
│       │       ├── route.ts             GET /api/sessions/:id
│       │       └── questions/route.ts   GET + POST /api/sessions/:id/questions
│       ├── questions/
│       │   └── [id]/upvote/route.ts     PATCH /api/questions/:id/upvote
│       ├── speakers/
│       │   ├── route.ts                 GET /api/speakers
│       │   └── [id]/route.ts            GET /api/speakers/:id
│       └── rooms/
│           ├── route.ts                 GET /api/rooms
│           └── [id]/route.ts            GET /api/rooms/:id
└── lib/
    ├── prisma.ts                        Singleton PrismaClient
    ├── response.ts                      sendSuccess / sendError
    └── isLive.ts                        Calcul statut live
prisma/
├── schema.prisma                        Schéma base de données
└── seed.ts                              Données de démo
```

---

## 🧱 Commandes Prisma

| Commande | Effet |
|----------|-------|
| `npm run db:generate` | Régénère le Prisma Client |
| `npm run db:push` | Sync schema → DB (sans migration) |
| `npm run db:migrate` | Applique les migrations |
| `npm run db:seed` | Insère les données de démo |
| `npm run db:studio` | GUI Prisma Studio |
| `npm run db:reset` | Remet la DB à zéro + reseed |

---

## 🌱 Données de démo (après seed)

- **1 événement** : Atelier Gastronomique 2025
- **3 salles** : Cuisine Principale, Atelier Pâtisserie, Salle de Dégustation
- **4 chefs** : Marie Dupont, Jean-Luc Martin, Amina Belhaj, Pierre Lefebvre
- **7 sessions** dont **1 session live** (active dès le lancement)
- **3 questions** de démo sur la session live
