'use strict';

const faker = require("faker");

let wikis = [];

for (let i = 1; i <= 5; i++) {
  wikis.push({
    id: i,
    title: faker.haker.noun(),
    body: faker.haker.phrase(),
    private: false,
    userId: i,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

for(let i = 6; i <=10; i++) {
  wikis.push({
    id: i,
    title: faker.haker.noun(),
    body: faker.haker.phrase(),
    private: false,
    userId: i-5,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Wikis", wikis, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Wikis", null, {});
  }
};
