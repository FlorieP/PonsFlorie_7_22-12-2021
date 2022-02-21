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
  let userId = token.getUserId(req);
  let message = Message.findOne({ where: { id: req.params.id } })
    .then(message => {
      Comment.create({
        include: [{ model: User }, { model: Message }],
        content: req.body.content,
        UserId: userId,
        MessageId: req.params.id
      })
        .then(() => res.status(201).json({ message: 'Commentaire créé' }))
        .catch(error => res.status(400).json({ message: error.message }));

    })
    .catch(error => { res.status(403).json({ message: error.message }) });
};

//Création du GET pour afficher tous les commentaires
exports.allComment = (req, res, next) => {
  Comment.findAll({
    where: { MessageId: req.params.id },
    order: [["id", "DESC"]],
    include: [User]
  })
    .then(comments => { res.status(200).json(comments) })
    .catch(error => res.status(400).json({ message: error.message }))
};

//Création du PUT pour modifier un commentaire
exports.modifyComment = (req, res, next) => {
  let userId = token.getUserId(req);
  Comment.findOne({ where: { id: req.params.id } })
    .then(comment => {
      //Vérification de l'userId en comparaison avec celui du commentaire
      if (userId != comment.userId) {
        res.status(403).json({ message: "Seul l'utilisateur qui a créé le commentaire peut le modifier" })
          .catch((error) => res.status(400).json({ message: error.message }));
      } else {
        //fonction qui permet de mettre à jour un commentaire
        Comment.update({ ...req.body }, { where: { id: req.params.id } })
          //modification du commentaire via le paramètre id 
          .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
          .catch(error => res.status(400).json({ message: error.message }));
      }
    })
    .catch(error => res.status(500).json({ message: error.message }));
};

//Création du DELETE pour supprimer un commentaire
exports.deleteComment = (req, res, next) => {
  let userId = token.getUserId(req);
  console.log(userId)
  Comment.findOne({ where: { id: req.params.id }})
    .then(comment => {
      //Vérification de l'userId en comparaison avec celui du commentaire
      if (userId != comment.userId) {
        res.status(403).json({ message: "Seul l'utilisateur qui a créé le commentaire peut le supprimer" })
          .catch((error) => res.status(400).json({ message: error.message }));
      } else {
        //fonction qui permet de mettre à jour un commentaire
        Comment.destroy({ where: { id: req.params.id } })
          //suppression du commentaire via le paramètre id 
          .then(() => res.status(200).json({ message: 'Commentaire supprimé!' }))
          .catch(error => res.status(400).json({ message: error.message }));
      }
    })
    .catch(error => res.status(500).json({ message: error.message }));
};