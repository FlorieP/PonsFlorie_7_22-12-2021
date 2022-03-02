'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message",  {
    userId : DataTypes.INTEGER,
    content: DataTypes.STRING,
    attachement: DataTypes.STRING
  })
  //Associaiton avec les autres tables
  //Appelé dans index.js
  Message.associate = (models) => {
    // define association here
    models.Message.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },
      onDelete:'CASCADE'
    }),
    models.Message.hasMany(models.Like);
    models.Message.hasMany(models.Comment);
  };

  return Message;
};

