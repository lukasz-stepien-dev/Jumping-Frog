class UserRepository {
    constructor() {
        this.users = [];
    }

    save(user) {
        this.users.push(user);
    }

    findByID(userID) {
        return this.users.find(user => user.userID === userID);
    }
}

module.exports = UserRepository;