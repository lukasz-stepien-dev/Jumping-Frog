class RemoveUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  execute(userID) {
    const user = this.userRepository.findByID(userID);
    if (user) {
      this.userRepository.delete(user);
    }
  }
}

module.exports = RemoveUser;
