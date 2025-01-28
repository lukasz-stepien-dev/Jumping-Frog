class GetRoom {
  constructor(roomRepository) {
    this.roomRepository = roomRepository;
  }

  execute(roomID) {
    return this.roomRepository.findByName(roomID);
  }
}

module.exports = GetRoom;
