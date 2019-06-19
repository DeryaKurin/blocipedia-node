const User = require("./models").User;
const Wiki = require("./models").Wiki;
const Collaborator = require("./models").Collaborator;
const Authorizer = require("../policies/wiki");

module.exports = {
  getAllCollaborators(callback) {
    return Collaborator.findAll()
    .then((collaborators) => {
      console.log("LOOK AT HERE:Controller>" + collaborators);
      callback(null, collaborators);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    });
  }
}
