class UserRepository {
  constructor() {
    this.users = [];
  }

  save(user) {
    this.users.push(user);
  }

  findByID(userID) {
    return this.users.find((user) => user.userID === userID);
  }

  delete(user) {
    this.users = this.users.filter((u) => u.userID !== user.userID);
  }
}

module.exports = UserRepository;
