'use strict';
module.exports = (sequelize, DataTypes) => {
  var Wiki = sequelize.define('Wiki', {
    title: {
      type: DataTypes.STRING,
      allownull: false
    },
    body: {
      type: DataTypes.STRING,
      allownull: false
    },
    private: {
      type: DataTypes.BOOLEAN,
      allownull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Wiki.associate = function(models) {
    // associations can be defined here
    Wiki.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Wiki.hasMany(models.Collaborator, {
      foreignKey: "wikiId",
      as: "collaborators"
    })
  };

  Wiki.prototype.isPrivate = function() {
    return this.private;
  };

  Wiki.prototype.isPublic = function() {
    return !this.private;
  };

  return Wiki;
};
