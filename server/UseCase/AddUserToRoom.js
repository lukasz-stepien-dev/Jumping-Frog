class AddUserToRoom {
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }

    execute(roomName, user) {
        const room = this.roomRepository.findByName(roomName);
        this.roomRepository.addUser(room, user);
        this.roomRepository.save(room);
    }
}

module.exports = AddUserToRoom;