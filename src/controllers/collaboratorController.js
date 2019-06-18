const collaboratorQueries = require("../db/queries.collaborators.js");
const Authorizer = require("../policies/wiki");

const User = require("../db/models/").User;
const Wiki = require("../db/models/").Wiki;
const Collaborator = require("../db/models/").Collaborator;


module.export = {
  index(req, res, next) {
    collaboratorQueries.getAllCollaborators((err, collaborators) => {
      if(err) {
        console.log(err);
        res.redirect(500, "wikis/wiki");
      } else {
        res.render("collaborators/index", {collaborators});
      }
    });
  },

  new(req, res, next) {
    const authorized =  new Authorizer(req.user).new();

    if(authorized) {
      res.render("collaborators/new", {wikiId: req.params.wikiId});
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect(`/wikis/${wiki.id}/collaborators/${collaborator.id}`);
    }
  },

  show(req, res, next) {
    collaboratorQueries.getCollaborator(req.params.id, (err, collaborator) => {
      if(err || collaborator === undefined) {
        req.flash('notice', 'No user found with that ID.');
        res.redirect(404, "/");
      } else {
        res.render("collaborators/show", { collaborator });
      }
    })
  },

  create(req, res, next) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then((user) => {
      let newCollaborator = {
        email: req.body.email,
        userId: req.user.id,
        wikiId: req.params.wikiId
      };
      collaboratorQueries.addCollaborator(newCollaborator, (err, collaborator) => {
        if(err) {
          req.flash("error", err);
          res.redirect(500, "collaborators/new");
        } else {
          res.render("collaborators/show", {collaborator});
        }
      })
    })
  }
}
