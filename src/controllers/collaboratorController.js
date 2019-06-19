const collaboratorQueries = require("../db/queries.collaborators.js");
const Authorizer = require("../policies/wiki");

const User = require("../db/models").User;
const Wiki = require("../db/models").Wiki;
const Collaborator = require("../db/models").Collaborator;


module.exports = {
  index(req, res, next) {
    collaboratorQueries.getAllCollaborators(req.body.wikiId, (err, collaborators) => {
      if (err) {
        res.redirect(500, "wikis/wiki");
      } else {
        console.log("LOOK AT HERE:" + collaborators);
        res.render("collaborators/index", { collaborators });
      }
    });
  }
}
