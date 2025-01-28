class RemoveRoom {
  constructor(roomRepository) {
    this.roomRepository = roomRepository;
  }

  execute(roomName) {
    const room = this.roomRepository.findByName(roomName);
    if (room) {
      this.roomRepository.delete(room);
    }
  }
}

module.exports = RemoveRoom;
