const express = require("express");
const app = express();

const routeConfig = require("./config/route/route-config.js");

routeConfig.init(app);

module.exports = app;
