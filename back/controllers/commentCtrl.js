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
  //récupération du userId dnas le token
  let userId = token.getUserId(req);
  //Récupération du message grace à l'id dans la requête
  let message = Message.findOne({ where: { id: req.params.id } })
    .then(message => {
      //Création du commentaire
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
  //récupération du userId dnas le token
  let userId = token.getUserId(req);
  //Récupération du commentaire grace à l'id dans la requête
  Comment.findOne({ where: { id: req.params.id } })
    .then(comment => {
      //Vérification de l'userId en comparaison avec celui du commentaire
      if (userId != comment.userId) {
        res.status(403).json({ message: "Seul l'utilisateur qui a créé le commentaire peut le modifier" })
          .catch((error) => res.status(400).json({ message: error.message }));
      } else {
        //fonction qui permet de mettre à jour un commentaire par l'id 
        Comment.update({ ...req.body }, { where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
          .catch(error => res.status(400).json({ message: error.message }));
      }
    })
    .catch(error => res.status(500).json({ message: error.message }));
};

//Création du DELETE pour supprimer un commentaire
exports.deleteComment = (req, res, next) => {
  //Récupération du commentaire grace à l'id dans la requête
  Comment.findOne({ where: { id: req.params.id }})
    .then(comment => {
      //Vérification de l'userId ou adminId en comparaison avec celui du commentaire
      if (! token.getAuthorization(req, comment.userId)) {
        res.status(403).json({ message: "Seul l'utilisateur qui a créé le commentaire peut le supprimer" })
          .catch((error) => res.status(400).json({ message: error.message }));
      } else {
        //fonction qui permet de supprimer un commentaire par id
        Comment.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: 'Commentaire supprimé!' }))
          .catch(error => res.status(400).json({ message: error.message }));
      }
    })
    .catch(error => res.status(500).json({ message: error.message }));
};