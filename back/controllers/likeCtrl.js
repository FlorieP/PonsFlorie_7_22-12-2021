//Importation des packages de node 
const jwt = require('jsonwebtoken');

//Importation du model message
const models = require('../models');
const Like = models.Like;
const Message = models.Message;
const User = models.User;

//Importation des middlewares
const token = require("../middleware/token");

// Ajouter un like
exports.addLike = (req, res) => {
    //récupération du userId dnas le token
    let userId = token.getUserId(req);
    console.log(userId)
    console.log(req.params.id)
    //Récupération du like grace à l'id message et l'id utilisateur
    Like.findOne({ where: { messageId: req.params.id, userId : userId }})
        .then(like => {
            //si il n'y a pas déjà de like 
            if (!like) {
                //création du like
                Like.create({
                    UserId: userId,
                    MessageId: req.params.id
                })
                    .then(() => res.status(201).json({ message: 'Like du message' }))
                    .catch(error => res.status(400).json({ message: error.message }));
            //si il y a déjà un like        
            } else {
                res.status(403).json({ message: "Like possible qu'une seule fois par utilisateur" })
                .catch((error) => res.status(400).json({ message: error.message }));
            }
        })
        .catch(error => { res.status(403).json({ message: error.message }) });
};

// Récupérer les likes d'un message
exports.allLike = (req, res, next) => {
    Like.findAll({
        where: { messageId: req.params.id },
        include: [User]
    })
        .then(likes => { res.status(200).json(likes) })
        .catch(error => res.status(400).json({ message: error.message }))
};


// Annuler un like
exports.removeLike = (req, res) => {
    //récupération du userId dnas le token
    let userId = token.getUserId(req);
    console.log(userId)
    console.log(req.params.id)
    //Récupération du like grace à l'id message et l'id utilisateur
    Like.findOne({ where: { MessageId: req.params.id, UserId: userId } })
        .then(like => {
            ///si il n'y a pas déjà de like 
            if (like) {
                console.log(like)
                //annulation du like existant
                like.destroy()
                     .then(() => res.status(201).json({ message: 'Annulation du like' }))
                     .catch(error => res.status(400).json({ message: error.message })); 
            } else {
                 res.status(403).json({ message: "Seul l'utilisateur peut annuler son like" })
                 .catch((error) => res.status(400).json({ message: error.message }));
             }
        })
        .catch(error => { res.status(403).json({ message: error.message }) });
};