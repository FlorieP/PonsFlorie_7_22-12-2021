//Importation des packages node
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//Importation des routes
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const commentRoutes = require('./routes/commentRoutes');
const likeRoutes = require('./routes/likeRoutes');

//Création de la constante application express
const app = express();

//Gestion des erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Récupération arguments et paramètre fourni dans le body d'une requête http
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

//Création du gestionnaire de la ressource images de manière statique
app.use('/images', express.static(path.join(__dirname, 'images')));

//Test
app.get('/', function (req, res) {
    res.status(200).send('<h1> Connexion au server</h1>');

});

//Création des méthodes d'utilisation des routes
app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/message', commentRoutes);
app.use('/api/message', likeRoutes);

//Exportation de l'application
module.exports = app;

