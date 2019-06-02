const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const User = require("../db/models/").User;


module.exports = {
  signUp(req, res, next){
    res.render("users/signup");
  },

  create(req, res, next){

     let newUser = {
       username: req.body.username,
       email: req.body.email,
       password: req.body.password,
       password_conf: req.body.passwordConfirmation
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
       if(!req.user){
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
   }
}
