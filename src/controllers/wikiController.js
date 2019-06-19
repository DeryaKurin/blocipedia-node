const wikiQueries = require("../db/queries.wikis.js");
const Authorizer = require("../policies/wiki");
const markdown = require( "markdown" ).markdown;


module.exports = {

  index(req, res, next) {
    const authorized = new Authorizer(req.user).show();
    if(authorized) {
      wikiQueries.getAllWikis((err, wikis) => {
        if(err) {
          // console.log(err);
          res.redirect(500, "static/index");
        } else {
          // console.log(wikis);
          res.render("wikis/wiki", {wikis});
        }
      });
    } else {
      req.flash("notice", "You must be signed in to do that.")
      res.redirect("/");
    }
  },

  new (req, res, next) {
    const authorized = new Authorizer(req.user).new();
    if(authorized) {
      res.render("wikis/new");
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/");
    }
  },

  create(req, res, next) {
      const authorized = new Authorizer(req.user).create();
      if(authorized) {
        let newWiki = {
          title: req.body.title,
          body: req.body.body,
          private: req.body.private,
          userId: req.user.id
        };



      wikiQueries.addWiki(newWiki, (err, wiki) => {
        if(err) {
          req.flash("error", err);
          res.redirect("/wikis/new");
        } else {
          res.redirect(`/wikis/${wiki.id}`);
        }
      });
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/");
    }
  },

  show(req, res, next) {
    const authorized = new Authorizer(req.user).show();
    if(authorized) {

    wikiQueries.getWiki(req.params.id, (err, wiki) => {
      if(err || wiki == null) {
        console.log(err);
        res.redirect(404, "/");
      } else {
        const htmlText = markdown.toHTML(wiki.body);
        res.render("wikis/show", {wiki, htmlText});
      }
    });
   } else {
     req.flash("notice", "You are not authorized to do that.");
     res.redirect("/");
   }
  },

  destroy(req, res, next) {
    wikiQueries.deleteWiki(req, (err, wiki) => {
      if(err) {
        res.redirect(500, `/wikis/${req.params.id}`)
      } else {
        res.redirect(303, "/wikis/");
      }
    });
  },

  edit(req, res, next) {
    const authorized = new Authorizer(req.user, req.body).edit();
    if(authorized) {

    wikiQueries.getWiki(req.params.id, (err, wiki) => {
      if(err || wiki == null) {
        res.redirect(404, "/");
      } else {
        res.render("wikis/edit", {wiki});
      }
    });
   } else {
    res.redirect("/");
   }
  },

  update(req, res, next) {
    wikiQueries.updateWiki(req, req.body, (err, wiki) => {
      if(err || wiki == null) {
        res.redirect(500, `/wikis/${req.params.id}/edit`);
      } else {
        res.redirect(`/wikis/${req.params.id}`);
      }
    });
  }
}
