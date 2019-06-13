const ApplicationPolicy = require("./application");

module.exports = class WikiPolicy extends ApplicationPolicy {

  new() {
    return this.user != null;
  }

  create() {
    return this.new();
  }

  show() {
    return this.new();
  }

  edit() {
    return this.new() &&
      this.record;
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
 }
