const User = require("./models").User;
const Wiki = require("./models").Wiki;
const Collaborator = require("./models").Collaborator;
const Authorizer = require("../policies/wiki");


module.exports = {
  getAllWikis(callback) {
    return Wiki.findAll()
    .then((wikis) => {
      callback(null, wikis);
    })
    .catch((err) => {
      callback(err);
    });
  },

  getWiki(id, callback) {
    console.log("LOOK AT HERE:" + id);
    return Wiki.findById(id, {
      include: [
        {model: User}
      ]
    })
    .then((wiki) => {
      // console.log(wiki);
      callback(null, wiki);
    })
    .catch((err) => {
      // console.log(err);
      callback(err);
    });
  },


  addWiki(newWiki, callback) {
    return Wiki.create(newWiki)
    .then((wiki) => {
      callback(null, wiki);
    })
    .catch((err) => {
      // console.log(err);
      callback(err);
    })
  },


  deleteWiki(req, callback) {
    return Wiki.findById(req.params.id)
    .then((wiki) => {
      const authorized = new Authorizer(req.user, wiki).destroy();

      if(authorized) {
        wiki.destroy()
        .then((res) => {
          callback(null, wiki);
        });
      } else {
        req.flash("notice", "You are not authorized to do that.")
        callback(401);
      }
    })
    .catch((err) => {
      callback(err);
    });
  },

  updateWiki(req, updatedWiki, callback) {
    return Wiki.findById(req.params.id)
    .then((wiki) => {

      if(!wiki) {
        return callback("Wiki not found");
      }

      const authorized = new Authorizer(req.user, wiki).update();

      if(authorized) {
        wiki.update(updatedWiki, {
          fields: Object.keys(updatedWiki)
        })
        .then(() => {
          callback(null, wiki);
        })
        .catch((err) => {
          callback(err);
        });
      } else {
        req.flash("notice", "You are not authorized to do that.");
        callback("Forbidden");
      }
    });
  },


  privateToPublic(id, callback) {
    Wiki.findAll()
    .then((wikis) => {
      wikis.forEach((wiki) => {
        if(wiki.userId == id && wiki.private == true) {
          wiki.update({
            private: false
          })
        }
      })
    })
    .then((wikis) => {
      callback(null, wikis);
    })
    .catch((err) => {
      callback(err);
    });
  },

  getAllCollaborators(req, callback) {
    return Wiki.findById(req.params.id, {
      include: [
        { model: Collaborator, as: "collaborators", include: [
          { model: User }
        ]}
      ]
    })
    .then((wiki) => {
      console.log("LOOK AT HERE:1>" + wiki);
      callback(null, wiki);
    })
    .catch((err) => {
      // console.log(err);
      callback(err);
    });
  }
}
