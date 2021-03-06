const userQueries = require("../db/queries.users.js");
const wikiQueries = require("../db/queries.wikis.js");
const passport = require("passport");
const User = require("../db/models/").User;
//Test mode Stripe API Keys
const secretKey = process.env.STRIPE_SECRET_KEY;
const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
const stripe = require("stripe")(secretKey);




module.exports = {
  signUp(req, res, next){
    res.render("users/signup");
  },

  show(req, res, next) {
    userQueries.getUser(req.params.id, (err, user) => {

      if(err || user === undefined) {
        console.log(err);
        req.flash('notice', 'No user found with that ID.');
        res.redirect(404, "/");
      } else {
        res.render("users/show", { user });
      }
    });
  },

  create(req, res, next){

     let newUser = {
       username: req.body.username,
       email: req.body.email,
       password: req.body.password,
       passwordConfirmation: req.body.passwordConfirmation
     };

     userQueries.createUser(newUser, (err, user) => {

       if(err){
         req.flash("error", err);
         res.redirect("/users/signup");
       } else {
         passport.authenticate("local")(req, res, () => {
                    req.flash("notice", "You've successfully created an account!");
                    res.redirect("/");
         });
         const sgMail = require('@sendgrid/mail');
         sgMail.setApiKey(process.env.SENDGRID_API_KEY);
         const msg = {
           to: newUser.email,
           from: 'test@example.com',
           subject: 'Welcome to Blocipedia!',
           text: 'Start sharing with Blocipedia community!',
           html: '<strong>Start posting wikis!</strong>',
         };
         sgMail.send(msg);
       }
     });
   },

   signInForm(req, res, next) {
     res.render("users/signin");
   },

   signIn(req, res, next) {
     passport.authenticate("local")(req, res, function () {
       if(!req.user) {
         req.flash("notice", "Sign in failed. Please try again.")
         res.redirect("/users/signin");
       } else {
         req.flash("notice", "You've successfully signed in!");
         res.redirect("/");
       }
     })
   },

   signOut(req, res, next) {
     req.logout();
     req.flash("notice", "You've successfully signed out!");
     res.redirect("/");
   },


   showUpgradePage(req, res, next) {
     userQueries.getUser(req.params.id, (err, user) => {
       if (err || user === undefined) {
         req.flash("notice", "No user found with that ID.");
         res.render("/");
       } else {
         res.render("users/upgrade", {user});
       }
     });
   },

   upgrade(req, res, next) {
     User.findOne({
    where: { email: req.user.email }
  })
  .then(user => {
    stripe.customers
      .create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
      })
      .then(customer => {
        stripe.charges
          .create({
            amount: 1500,
            description: "Blocipedia Account Upgrade Charge - TC",
            currency: "usd",
            customer: customer.id
          })
          .then(charge => {
              console.log("CHARGE:", charge);
              userQueries.toggleUser(user, (err, user) => {
                if (err | user == null) {
                req.flash("notice", "No user found with that ID.");
                res.render("/wikis");
                } else if (user.role == 1) {
                res.render("users/upgradeSuccess", {user});
                }
            });
          });
      });
  })
  .catch(err => {
    res.redirect(500, "/");
  });
   },

   showDowngradePage(req, res, next) {
     userQueries.getUser(req.params.id, (err, user) => {
       if(err | user === undefined) {
         console.log(err);
         req.flash("notice", "No user found with that ID.");
         res.redirect("/");
       } else {
         console.log(user);
         res.render("users/downgrade", {user});
       }
     });
   },


   downgrade(req, res, next) {
     User.findOne({
       where: { id: req.params.id }
     })
     .then((user) => {
       if(user) {
         userQueries.toggleUser(user);
         wikiQueries.privateToPublic(req.user.id);
         req.flash("notice", "Your downgrade was successful!");
         res.redirect("/wikis");
       } else {
         console.log(user);
         req.flash("notice", "Downgrade unsuccessful.");
         res.render("users/show", {user});
       }
     });
   }
}
