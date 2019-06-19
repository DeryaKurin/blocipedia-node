const collaboratorQueries = require("../db/queries.collaborators.js");
const wikiQueries = require("../db/queries.wikis.js");
const Authorizer = require("../policies/wiki");

const User = require("../db/models").User;
const Wiki = require("../db/models").Wiki;
const Collaborator = require("../db/models").Collaborator;


module.exports = {
  index(req, res, next) {
    wikiQueries.getAllCollaborators(req, (err, wiki) => {
      if (err) {
        console.log("LOOK AT HERE 3:" + err);
        res.redirect(404, `/wikis/:${wiki.id}`);
      } else {
        // console.log("LOOK AT HERE:" + wiki);
        res.render("collaborators/index", { wiki });
      }
    });
  }
}
