const collaboratorQueries = require("../db/queries.collaborators.js");
const wikiQueries = require("../db/queries.wikis.js");
const Authorizer = require("../policies/wiki");

const User = require("../db/models").User;
const Wiki = require("../db/models").Wiki;
const Collaborator = require("../db/models").Collaborator;


module.exports = {
  index(req, res, next) {
    wikiQueries.getAllCollaborators(req.params.id, (err, wiki) => {
      if (err || req.params.id == null) {
        res.redirect(404, `/wikis`);
      } else {
        // console.log("LOOK AT HERE:" + wiki);
        res.render("collaborators/index", { wiki });
        console.log('collaborators', collaborators);
        console.log('LOOK AT HERE : 4>wiki', wiki);
      }
    });
  }
}
