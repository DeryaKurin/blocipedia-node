require('dotenv').config();

'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "must be a valid email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Wiki, {
      foreignKey: "userId",
      as: "wikis"
    });

    User.hasMany(models.Collaborator, {
      foreignKey: "userId",
      as: "collaborators"
    });
  };

  User.prototype.isStandard = function () {
    return this.role == 0;
  };

  User.prototype.isAdmin = function () {
    return this.role == 2;
  };

  User.prototype.isPremium = function () {
    return this.role == 1;
  };

  User.prototype.isOwner = function(wiki) {
    return this.id === wiki.userId;
  };

  return User;

};
