//Importation des packages de node
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');
const dotenv = require('dotenv').config();
const fs = require('fs'); //filesystem

// Importation du model de l'utilisateur
const models = require('../models');
const User = models.User;

//Importation des middlewares
const token = require("../middleware/token");

//Constantes
const email_Regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const pw_Regex = /^(?=.*\d).{6,16}$/;

//Création du POST pour la création d'un utilisateur
exports.signup = (req, res, next) => {
    //Paramètres
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    debugger;
    //Vérification de la validité des infos
    if (firstname == null || lastname == null || email == null || password == null) {
        return res.status(400).json({ 'error': 'Paramètres manquants' });
    }
    //Vérification de la validité de l'email
    if (!email_Regex.test(email)) {
        return res.status(400).json({ 'error': 'Email invalide' });
    }
    //Vérification de la complexité du mdp
    if (!pw_Regex.test(password)) {
        return res.status(400).json({ 'error': 'Mot de passe inalide. Longeur entre 6 et 16 carctères incluant au moins un chiffre' });
    }

    User.findOne({ where : {email: email }})
        .then(function (user) {
            console.log(user)
            if (!user) {
                //Chiffrement de l'email
                //const emailCrypto = cryptojs.HmacSHA256(email, process.env.CRYPTOJS_KEY_EMAIL).toString();
                //Hashage du mot de passe
                bcrypt.hash(password, 10)
                    //Récupération du hash de mdp 
                    .then(hash => {
                        //Création du nouvel utlisateur
                        const user = new User({
                            firstname: firstname,
                            lastname: lastname,
                            email: email /*emailCrypto*/,
                            password: hash,
                            bio: "",
                            avatar: "",
                            isAdmin: 0
                        });
                        //Enregistrement du nouvel utilisateur
                        user.save()
                            //Connexion serveur réussi
                            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                            //Gestion erreur serveur
                            .catch(error => res.status(400).json({ error }));
                    })
                    //Gestion erreur serveur
                    .catch(error => res.status(500).json({ error }));
            } else {
                return res.status(409).json({ 'error': 'Utilisateur existant' });
            }
        })
        .catch(function (error) {
            return res.status(500).json({ error });
        });
};

//Création du POST pour la connexion d'un utilisateur
exports.login = (req, res, next) => {
    //Params
    var email = req.body.email;
    var password = req.body.password;
    //Vérification de la validité des infos
    if (email == null || password == null) {
        return res.status(400).json({ 'error': 'Paramètres manquants' });
    }
    // Chiffrement email
    //const emailCrypto = cryptojs.HmacSHA256(email, process.env.CRYPTOJS_KEY_EMAIL).toString();
    //Utilisation de la méthode findOne pour trouver l'utilisateur qui correspond à l'adresse mail utilisé
    User.findOne({ where: {email: email} /*emailCrypto*/ })
        //Vérification de récupération d'un utilisateur
        .then(user => {
            console.log(user)
            //Si on a pas trouvé d'utilisateur renvoyer une erreur
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            //Si trouvé, comparaison des mdp avec bcrypt
            bcrypt.compare(password, user.password)
                //Boolean pour savoir si la comparaison est bonne
                .then(valid => {
                    if (!valid) {
                        //Mauvais mdp retourne une erreur 
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    //Bon mdp, renvoi d'un json avec un id et un token 
                    res.status(200).json({
                        userId: user.id,
                        //appel de la fonction sign de JWT
                        token: jwt.sign(
                            //1er argument des données que l'on veut encodé
                            { userId: user.id },
                            //clé secret de l'encodage
                            process.env.JWT_KEY_TOKEN,
                            //configuration de l'expiration du token
                            { expiresIn: '24h' }
                        )
                    });
                    console.log('Utilisateur ' + user.id + ' connecté')
                })
                //Gestion erreur serveur
                .catch(error => res.status(500).json({ error }));
        })
        //Gestion erreur serveur
        .catch(error => res.status(500).json({ error }));
};

//Création du GET pour afficher un profil utilisateur
exports.profil = (req, res, next) => {
    //fonction findOne qui permet de trouver une utilisateur en particulier
    User.findOne({
        attributes: ["firstname", "lastname", "bio", "avatar", "email"],
        where: { id: req.params.id },
    })
        .then((user) => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: "Utilisateur non trouvé" });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "Impossible de voir le profil" });
        });
};


//Création du PUT pour modifier le profil d'un utilisateur
exports.modify = (req, res, next) => {
    let userId = token.getUserId(req);
    console.log("userId:" + userId);
    //Récupération du nom et l'url du fichier
    User.findOne({ where: { id: req.params.id }})
        .then(user => {
            //Vérification de l'userId en comparaison avec l'userId du token
            if (userId != user.id) {
                res.status(403).json({ message: "Seul l'utilisateur concerné peut modifier son profil" })
                    .catch((error) => res.status(400).json({ message: error.message }));
            } else {
                const userObject = req.file ?
                    {
                        ...req.body,
                        avatar: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                    } : { ...req.body }
                User.update({ ...userObject, id: req.params.id }, { where: { id: req.params.id } })
                    .then(() => res.status(200).json({ ...userObject }))
                    .catch(error => res.status(400).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ message: error.message }));
};


//Création du DELETE pour supprimer un utilisateur
exports.delete = (req, res, next) => {
    let userId = token.getUserId(req);
    console.log("userId:" + userId);
    console.log(req.params.id);
    //Récupération du nom et l'url du fichier
    User.findOne({where :{ id: req.params.id }})
        .then(user => {
            //Vérification de l'userId en comparaison avec l'userId du token
            if (userId != user.id) {
                res.status(403).json({ message: "Seul l'utilisateur concerné peut supprimer son compte" })
                    .catch((error) => res.status(400).json({ message: error.message }));
            } else {
                const filename = "";
                if (user.avatar != null) {
                    //récupération du nom du fichier via un split de l'url
                    filename = user.avatar.split('/images/')[1];
                }
                //suppression du fichier
                fs.unlink(`images/${filename}`, () => {
                    //fonction qui permet de supprimer un utilisateur
                    User.destroy({ where: { id: req.params.id } })
                        //suppression de la sauce via le paramètre id
                        .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
                        .catch(error => res.status(400).json({ message: error.message }));
                });
            }
        })
        .catch(error => res.status(500).json({ message: error.message }));
};
