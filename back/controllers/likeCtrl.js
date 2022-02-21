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
    let userId = token.getUserId(req);
    console.log(userId)
    console.log(req.params.id)
    let message = Message.findOne({ where: { id: req.params.id } })
        .then(message => {
            if (userId != Like.userId) {
                res.status(403).json({ message: "Like possible qu'une seule fois par utilisateur" })
                    .catch((error) => res.status(400).json({ message: error.message }));
            } else {
            Like.create({
                include: [{ model: User }, { model: Message }],
                UserId: userId,
                MessageId: req.params.id
            })
                .then(() => res.status(201).json({ message: 'Like du message' }))
                .catch(error => res.status(400).json({ message: error.message }));
            }

        })
        .catch(error => { res.status(403).json({ message: error.message }) });
};

// Récupérer les likes d'un message
exports.allLike = (req, res, next) => {
    Like.findAll({
        where: { MessageId: req.params.id },
        include: [User]
    })
        .then(likes => { res.status(200).json(likes) })
        .catch(error => res.status(400).json({ message: error.message }))
};


// Annuler un like
exports.removeLike = (req, res) => {
    let userId = token.getUserId(req);
    console.log(userId)
    console.log(req.params.id)
    Like.findOne({ where: { MessageId: req.params.id, UserId: userId } })
        .then(like => {
            if (userId != Like.UserId) {
                console.log("bouh")
                res.status(403).json({ message: "Seul l'utilisateur qui a créé le liker peut l'annuler" })
                    .catch((error) => res.status(400).json({ message: error.message }));
            } else {
                console.log("bouh2")
                Like.create({
                    include: [{ model: User }, { model: Message }],
                    UserId: userId,
                    MessageId: req.params.id
                })
                    .then(() => res.status(201).json({ message: 'Annulation du like' }))
                    .catch(error => res.status(400).json({ message: error.message }));
            }

        })
        .catch(error => { res.status(403).json({ message: error.message }) });
};