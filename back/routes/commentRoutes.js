//Importation des packages de node
const express = require('express');

//Création d'un routeur
const router = express.Router();

//Importation des middleware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Importation du controller pour associer les fonctions aux routes 
const commentCtrl = require('../controllers/commentCtrl');

//Création des routes
router.post('/new', multer, commentCtrl.createComment);
router.get('/', commentCtrl.allComment);
router.put('/:id', commentCtrl.modifyComment);
router.delete('/:id', commentCtrl.deleteComment);

//Exportation du routeur de l'utilisateur
module.exports = router;