//Importation des packages de node 
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const fs = require('fs'); //filesystem

//Importation du model message
const models = require('../models');
const Message = models.Message;
const User = models.User;
const Comment = models.Comment;

//Importation des middlewares
const token = require("../middleware/token");

//Création du POST pour créer un commentaire
exports.createComment = (req, res) => {
  User.findOne({
    attributes: ["firstname", "lastname", "avatar"],
    where: { id: token.getUserId(req) },
  })
  Comment.create({
    include: [
      {
        model: User,
        attributes: ["firstname", "lastname", "avatar"],
      },
    ],
    content: req.body.content,
    UserId: req.body.UserId,
    MessageId: req.body.MessageId,
  })
    .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
    .catch(error => res.status(400).json({ error }));
};

//Création du GET pour afficher tous les commentaires
exports.allComment = (req, res, next) => {
  Comment.findAll({
    where: {
      MessageId: req.params.id
    },
    include: {
      model: User,
      required: true,
      attributes: ["firstname", "lastname", "avatar"]
    },
    order: [["id", "DESC"]]
  })
    .then(comments => { res.status(200).json(comments) })
    .catch(error => res.status(400).json({ error }))
};

//Création du PUT pour modifier un commentaire
exports.modifyComment = (req, res, next) => {
  Comment.findOne({ id: req.params.id })
    .then(comment => {
      //Vérification de l'userId en comparaison avec celui du commentaire
      if (req.body.userId != comment.userId) {
        res.status(403).json({ message: "Seul l'utilisateur qui a créé le commentaire peut le modifier" })
          .catch((error) => res.status(400).json({ error }));
      } else {
        //Savoir si il y a ou non une nouvelle image dans la modification
        const commentObject = req.file ?
          {
            ...JSON.parse(req.body.comment),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          } : { ...req.body };
        //fonction qui permet de mettre à jour un commentaire
        Comment.updateOne({ id: req.params.id }, { ...commentObject, id: req.params.id })
          //modification du commentaire via le paramètre id 
          .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
          .catch(error => res.status(400).json({ error }));
      }
    })
    .catch(error => res.status(500).json({ error }));
};

//Création du DELETE pour supprimer un commentaire
exports.deleteComment = (req, res, next) => {
  //Récupération du nom et l'url du fichier
  Comment.findOne({ id: req.params.id })
    .then(comment => {
      //Récupération du token 
      const token = req.headers.authorization.split(' ')[1];
      //Décodage du token 
      const decodedToken = jwt.verify(token, process.env.JWT_KEY_TOKEN);
      // Récupération de l'userId inclus dans le token
      const userId = decodedToken.userId;
      //Vérification de l'userId en comlparaison à l'userId du message
      if (userId != comment.userId) {
        res.status(403).json({ message: "Seul l'utilisateur qui a créé le commentaire peut le supprimer" })
          .catch((error) => res.status(400).json({ error }));
      } else {
        //récupération du nom du fichier via un split de l'url
        const filename = comment.attachement.split('/images/')[1];
        //suppression du fichier
        fs.unlink(`images/${filename}`, () => {
          //fonction qui permet de supprimer un message
          Comment.deleteOne({ id: req.params.id })
            //suppression duu message via le paramètre id
            .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
            .catch(error => res.status(400).json({ error }));
        });
      }
    })
    .catch(error => res.status(500).json({ error }));
};