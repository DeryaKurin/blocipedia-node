require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const logger = require('morgan');


module.exports = {
  init(app, express){
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "..", "assets")));
    app.use(logger('dev'));

  }
};
