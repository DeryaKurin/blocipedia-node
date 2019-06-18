module.exports = class ApplicationPolicy {

  constructor(user, record) {
    this.user = user;
    this.record = record;
  }

  _isPrivate() {
    return this.record && this.record.private;
  }

  _isPublic() {
    return this.record && !this.record.private;
  }

  _isOwner() {
    return this.record && this.user && (this.record.userId == this.user.id);
  }

  _isAdmin() {
    return this.user && this.user.role == 2; //admin role will have a value of 2
  }

  _isPremium() {
    return this.user && this.user.role == 1; //premium role will have a value of 1
  }

  _isStandard() {
    return this.user && this.user.role == 0; //Standard role will have a value of 0
  }


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
