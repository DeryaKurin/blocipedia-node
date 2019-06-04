const wikiQueries = require("../db/queries.wikis.js");

module.exports = {

  index(req, res, next) {
    wikiQueries.getAllWikis((err, wikis) => {
      if(err) {
        console.log(err);
        res.redirect(500, "static/index");
      } else {
        console.log(wikis);
        res.render("wikis/wiki", {wikis});
      }
    });
  },

  new (req, res, next) {
    res.render("wikis/new");
  },

  create(req, res, next) {

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

  },

  show(req, res, next) {
  
    wikiQueries.getWiki(req.params.id, (err, wiki) => {
      if(err || wiki == null) {
        console.log(err);
        res.redirect(404, "/");
      } else {
        console.log(wiki);
        res.render("wikis/show", {wiki});
      }
    });
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
    wikiQueries.getWiki(req, (err, wiki) => {
      if(err || wiki == null) {
        res.redirect(404, "/");
      } else {
        if(req.userId) {
          res.render("wikis/edit", {wiki});
        } else {
          req.flash("notice", "You are not authorized to do that.");
          res.redirect(500, `/wikis/${req.params.id}`);
        }
      }
    });
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
