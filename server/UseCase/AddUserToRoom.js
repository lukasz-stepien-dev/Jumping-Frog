class AddUserToRoom {
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }

    execute(roomID, user) {
        const room = this.roomRepository.findByID(roomID);
        room.addUser(user);
        this.roomRepository.save(room);
    }
}

module.exports = AddUserToRoom;