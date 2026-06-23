# MJ Facility

application pour lancer de dés et pour création de fiche de personnage.

## Prérequis

- Docker Desktop installé

## Lancement

```bash
git clone https://github.com/votre-utilisateur/DossierProjet.git
cd DossierProjet/backend
cp .env.example .env
docker-compose up --build
```

##Accès 

|
Interface
|
URL
|
|
---
|
---
|
|
MJ Facility
|
http://localhost:3000
|
|
PhpMyAdmin
|
http://localhost:8080
|
|
Mongo Express
|
http://localhost:8081
|

## Stack

- Node.js / Express
- MySQL / Sequelize
- MongoDB / Mongoose
- Docker

## Compte Admin

Défini dans le fichier `.env` via `ADMIN_EMAIL` et `ADMIN_PASSWORD`.

> Ne jamais commiter le fichier `.env`. Utiliser `.env.example` comme modèle.
