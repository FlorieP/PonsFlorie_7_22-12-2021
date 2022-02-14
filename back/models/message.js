'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message",  {
    userId : DataTypes.INTEGER,
    content: DataTypes.STRING,
    attachement: DataTypes.STRING
  }, {
    classMethods:{
      associate(models) {
        // define association here
        models.Message.belongTo(models.User, {
          foreignKey: {
            allowNull: false
          },
          onDelete:'CASCADE'
        }),
        models.Message.hasMany(models.Like);
        models.Message.hasMany(models.Comment);
      }
    }
  });

  return Message;
};

