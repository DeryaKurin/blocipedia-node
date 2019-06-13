'use strict';

const bcrypt = require("bcryptjs");

const faker = require("faker");

let users = [];
for (let i = 1; i <= 3; i++) {
  users.push({
    id: i,
    username: `member${i}`,
    email: `member${i}@gmail.com`,
    password: bcrypt.hashSync(`${i}${i}${i}${i}${i}${i}${i}${i}`, bcrypt.genSaltSync()),
    role: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

users.push({
  id: 4,
  username: `admin`,
  email: `admin@gmail.com`,
  password: bcrypt.hashSync(`adminadmin`, bcrypt.genSaltSync()),
  role: 2,
  createdAt: new Date(),
  updatedAt: new Date()
});

users.push({
  id: 5,
  username: `premium`,
  email: `premium@gmail.com`,
  password: bcrypt.hashSync(`premiumpremium`, bcrypt.genSaltSync()),
  role: 1,
  createdAt: new Date(),
  updatedAt: new Date()
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
