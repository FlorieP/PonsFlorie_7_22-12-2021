'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment",  {
    userId : DataTypes.INTEGER,
    messageId : DataTypes.INTEGER,
    content: DataTypes.STRING,
  }, {
    classMethods:{
      associate(models) {
        // define association here
        models.Comment.belongTo(models.User, {
          foreignKey: {
            allowNull: false
          },
          onDelete:'CASCADE'
        }),
        models.Comment.belongTo(models.Message, {
          foreignKey: {
            allowNull: false
          },
          onDelete:'CASCADE'
        }),
        models.Comment.hasMany(models.Like);
      }
    }
  });

  return Comment;
};

