class GetRoom {
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }

    execute(roomID) {
        return this.roomRepository.findByID(roomID);
    }
}

module.exports = GetRoom;