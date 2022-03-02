//Importation des packages de node
const jwt = require("jsonwebtoken");

module.exports = {
  //Récupération du userId du token
  getUserId: function (req) {
    //Récupération du token dans le header authorization
    const token = req.headers.authorization.split(' ')[1];
    //Décodage du token 
    const decodedToken = jwt.verify(token, process.env.JWT_KEY_TOKEN);
    // Récupération de l'userId inclus dans le token
    const userId = decodedToken.userId;
    //On retourne le userId
    return userId;
  },
  
  //Récupération du userId et du boolean isAdmin du token
  getAuthorization: function (req, userId) {
    //Récupération du token dans le header authorization
    const token = req.headers.authorization.split(' ')[1];
    //Décodage du token 
    const decodedToken = jwt.verify(token, process.env.JWT_KEY_TOKEN);
    // Récupération de l'userId et du boolean isAdmin inclus dans le token
    const userIdToken = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    console.log(userId);
    console.log(userIdToken);
    console.log(isAdmin);
    //On retourne l'autorisation de suppresion si admin ou user en question 
    if (userId == userIdToken || isAdmin) { return true; }
    else {
      return false;
    }

  }
}
