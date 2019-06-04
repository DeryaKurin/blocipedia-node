const User = require("./models").User;
const Wiki = require("./models").Wiki;

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
    return Wiki.findById(id)
    .then((wiki) => {
      console.log(wiki);
      callback(null, wiki);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    });
  },



  addWiki(newWiki, callback) {
    return Wiki.create(newWiki)
    .then((wiki) => {
      callback(null, wiki);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    })
  },



  deleteWiki(req, callback) {
    return Wiki.findById(req.params.id)
    .then((wiki) => {
      if(req.user) {
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
      if(req.user) {
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
  }
}
