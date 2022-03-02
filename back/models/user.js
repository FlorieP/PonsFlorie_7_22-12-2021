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
  })
  //Appelé dans index.js de model
  //Associaiton avec les autres tables
  User.associate = (models) => {
    // define association here
    models.User.hasMany(models.Message);
    models.User.hasMany(models.Like);
    models.User.hasMany(models.Comment);
  };

  return User;
};