//Importation des packages de node
const jwt = require("jsonwebtoken");

//Récupération du userId du token
function getUserId(req) {
  //Récupération du token dans le header authorization
  const token = req.headers.authorization.split(' ')[1];
  //Décodage du token 
  const decodedToken = jwt.verify(token, process.env.JWT_KEY_TOKEN);
  // Récupération de l'userId inclus dans le token
  const userId = decodedToken.userId;
    //On retourne le userId
    return userId;

    
}
module.exports.getUserId = getUserId;
