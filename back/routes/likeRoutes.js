//Importation des packages de node
const express = require('express');

//Création d'un routeur
const router = express.Router();

//Importation des middleware
const auth = require('../middleware/auth');

//Importation du controller pour associer les fonctions aux routes 
const likeCtrl = require('../controllers/likeCtrl');

//Création des routes
router.post("/:id/like", auth, likeCtrl.addLike);
router.get("/:id/like", auth, likeCtrl.allLike);
router.delete("/:id/like", auth, likeCtrl.removeLike);

//Exportation du routeur de l'utilisateur
module.exports = router;