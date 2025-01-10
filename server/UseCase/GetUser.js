class GetUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    execute(userID) {
        return this.userRepository.findByID(userID);
    }
}

module.exports = GetUser;