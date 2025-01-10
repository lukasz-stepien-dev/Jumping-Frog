const User = require('../Model/User');

class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    execute(userID) {
        const user = new User(userID);
        this.userRepository.save(user);
    }
}

module.exports = CreateUser;