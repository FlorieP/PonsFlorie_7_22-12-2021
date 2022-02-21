//Importation des packages de node
const express = require('express');

//Création d'un routeur
const router = express.Router();

//Importation des middleware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Importation du controller pour associer les fonctions aux routes 
const messageCtrl = require('../controllers/messageCtrl');

//Création des routes
router.post('/new', auth, multer, messageCtrl.createMessage);
router.get('/', auth, messageCtrl.allMessage);
router.get('/:id', auth, messageCtrl.oneMessage);
router.put('/:id', auth,  multer, messageCtrl.modifyMessage);
router.delete('/:id', auth, multer, messageCtrl.deleteMessage);

//Exportation du routeur de l'utilisateur
module.exports = router;