//Importation des packages de node
const express = require('express');

//Création d'un routeur
const router = express.Router();

//Importation des middleware
const auth = require('../middleware/auth');

//Importation du controller pour associer les fonctions aux routes 
const userCtrl = require('../controllers/userCtrl');

//Création des routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profil/:id', auth, userCtrl.profil);
router.put('/profil/:id', auth, userCtrl.modify);
router.delete('/profil/:id', auth, userCtrl.delete);

//Exportation du routeur de l'utilisateur
module.exports = router;