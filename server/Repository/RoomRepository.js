class RoomRepository {
    constructor() {
        this.rooms = [];
    }

    save(room) {
        this.rooms.push(room);
    }

    delete(room) {
        this.rooms = this.rooms.filter(r => r.name !== room.name);
    }

    findByName(name) {
        return this.rooms.find(room => room.name === name);
    }

    isRoomExist(name) {
        return this.rooms.some(room => room.name === name);
    }

    addUser(room, user) {
        room.users.push(user);
    }
}

module.exports = RoomRepository;