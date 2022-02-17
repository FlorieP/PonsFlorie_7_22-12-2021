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
        models.Message.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          },
          onDelete:'CASCADE'
        }),
        models.Message.hasMany(models.Like);
        models.Message.hasMany(models.Comment);
      }
    }
  })
  /*Message.associate = function (models) {
    Message.belongsToMany(models.User, { 
      through: 'User',
      foreignKey: 'userId'
    })
  };
*/
  return Message;
};

