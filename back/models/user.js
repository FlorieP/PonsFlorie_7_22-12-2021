'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User",  {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    bio: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  /*}, {
    classMethods:{
      associate(models) {
        // define association here
        models.User.hasMany(models.Message);
        models.User.hasMany(models.Like);
        models.User.hasMany(models.Comment);
      }
    }*/
  })
  User.associate = function (models) {
    User.hasMany(models.Message);
  };

/*class User extends Model {}
User.init({
  firstname: DataTypes.STRING,
  lastname: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  avatar: DataTypes.STRING,
  bio: DataTypes.STRING,
  profil: DataTypes.STRING,
  isAdmin: DataTypes.BOOLEAN
}, {sequelize, modelName: 'users'});*/


  return User;
};
