class Room {
    constructor(name, owner) {
        this.name = name;
        this.owner = owner;
        this.users = [];
    }
}

module.exports = Room;