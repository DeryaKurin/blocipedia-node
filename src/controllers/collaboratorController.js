const collaboratorQueries = require("../db/queries.collaborators.js");
const Authorizer = require("../policies/wiki");

const User = require("../db/models").User;
const Wiki = require("../db/models").Wiki;
const Collaborator = require("../db/models").Collaborator;


module.export = {
  index(req, res, next) {
    collaboratorQueries.getAllCollaborators((err, collaborators) => {
      if (err) {
        console.log("LOOK AT HERE:queries>" + err);
        res.redirect(500, "wikis/wiki");
      } else {
        res.render("collaborators/index", { collaborators });
      }
    });
  }
}
