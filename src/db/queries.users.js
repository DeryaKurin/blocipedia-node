const User = require("./models").User;
const Wiki = require("./models").Wiki;
const bcrypt = require("bcryptjs");


module.exports = {
  createUser(newUser, callback){

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword,
    })
    .then((user) => {

      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getUser(id, callback) {
    return User.findById(id)
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
   },

   // upgrade(id, callback) {
   //   return User.findById(id)
   //   .then((user) => {
   //     if (!user) {
   //       return callback("User not found!");
   //     } else {
   //       user.updateAttributes({
   //         role: 1
   //       })
   //       .then((user) => {
   //         callback(null, user);
   //       })
   //       .catch((err) => {
   //         callback(err);
   //       });
   //     }
   //   });
   // },
   //
   // downgrade(id, callback) {
   //   return User.findById(id)
   //   .then((user) => {
   //     if(!user) {
   //       return callback("User not found!");
   //     } else {
   //       user.updateAttributes({
   //         role: 0
   //       })
   //       .then((user) => {
   //         callback(null, user);
   //       })
   //       .catch((err) => {
   //         callback(err);
   //       });
   //     }
   //   });
   // }

   toggleUser(user) {
     User.findOne({
       where: { email: user.email }
     })
     .then((user) => {
       if(user.role == 0) {
         user.update({
           role: 1
         });
       }
       if (user.role == 1){
         user.update({
           role: 0
         });
       }
     });
   }
}
