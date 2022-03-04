# GROUPOMANIA

Un réseau social interne d'entreprise.
  
## Pré-requis

Logiciels nécessaires pour lancer l'application:

- MySQL
- Node.js
- Express.js
- Dotenv
- Vue.js
- Vuex
 
  
## Installation
### Back

1. Telechargez et installer Node.js:
```bash
  npm install
``` 
2. Initialiser le projet : 
```bash
  npm start
``` 
3. Puis lancez le serveur en tapant la commande : 
```bash
  node server
``` 
- Le serveur doit fonctionner sur [`http://localhost:3000/`](http://localhost:3000/).


### Base de données
- Créer un fichier .env dans le dossier du backend en ajoutant vos informations de connexion à la base de données dont vous avez un exemple dans le dossier back.

1. Installez mysql:
```bash
  npm install mysql
``` 
2. Installer sequelize : 
```bash
  npm install sequelize
``` 
3. Création de la base de données : 
```bash
  sequelize db:create
``` 
3. Migration de la base de données : 
```bash
  sequelize db:migrate
``` 

## Dossier Frontend

1. Installer Vue.js:
```bash
  npm install vue
``` 
2. Installer Vuex : 
```bash
  npm install vuex@next
``` 
3. Puis lancez le serveur en tapant la commande : 
```bash
  npm run serve
``` 
- Le serveur doit fonctionner sur [`http://localhost:8080/`](http://localhost:8080/).

## Auteur

Florie PONS
