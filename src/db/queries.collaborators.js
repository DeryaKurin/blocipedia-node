const User = require("./models").User;
const Wiki = require("./models").Wiki;
const Collaborator = require("./models").Collaborator;
const Authorizer = require("../policies/wiki");

module.exports = {
  getAllCollaborators(callback) {
    return Collaborator.findAll()
    .then((collaborators) => {
      callback(null, collaborators);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    });
  },

  getCollaborator(id, callback) {
    return Collaborator.findById(id)
    .then((collaborator) => {
      callback(null, collaborator);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addCollaborator(newCollaborator, callback) {
    return Collaborator.create(newCollaborator)
    .then((collaborator) => {
      callback(null, collaborator);
    })
    .catch((err) => {
      callback(err);
    });
  },

  removeCollaborator(req, callback) {
    return Collaborator.findById(req.params.id)
    .then((collaborator) => {
      const authorized = new Authorizer(req.user, collaborator).destroy();

      if(authorized) {
        collaborator.destroy()
        .then((res) => {
          callback(null, collaborator);
        });
      } else {
        req.flash("notice", "You are not authorized to do that.")
        callback(401);
      }
    })
    .catch((err) => {
      callback(err);
    });
  }
}
