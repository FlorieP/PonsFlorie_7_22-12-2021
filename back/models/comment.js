'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    userId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER,
    content: DataTypes.STRING,
  })

  Comment.associate = (models) => {
    // define association here
    models.Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },
      onDelete: 'CASCADE'
    }),
      models.Comment.belongsTo(models.Message, {
        foreignKey: {
          allowNull: false
        },
        onDelete: 'CASCADE'
      }),
      models.Comment.hasMany(models.Like);
  }
  return Comment;
};