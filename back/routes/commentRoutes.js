//Importation des packages de node
const express = require('express');

//Création d'un routeur
const router = express.Router();

//Importation des middleware
const auth = require('../middleware/auth');

//Importation du controller pour associer les fonctions aux routes 
const commentCtrl = require('../controllers/commentCtrl');

//Création des routes
router.post('/:id/comment/new', auth, commentCtrl.createComment);
router.get('/:id/comment', auth, commentCtrl.allComment);
router.put('/:id/comment/:id', auth, commentCtrl.modifyComment);
router.delete('/:id/comment/:id', auth, commentCtrl.deleteComment);

//Exportation du routeur de l'utilisateur
module.exports = router;