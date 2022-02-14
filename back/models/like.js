'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("Like",  {
    userId : DataTypes.INTEGER,
    messageId : DataTypes.INTEGER,
  }, {
    classMethods:{
      associate(models) {
        // define association here
        models.Like.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          },
          onDelete:'CASCADE'
        }),
   
         models.Like.belongsTo(models.Message, {
          foreignKey: {
            allowNull: false
          },
          onDelete:'CASCADE'
        })
      }
    }
  });

  return Like;
};