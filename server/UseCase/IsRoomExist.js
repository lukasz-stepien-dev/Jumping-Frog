class IsRoomExist {
  constructor(roomRepository) {
    this.roomRepository = roomRepository;
  }

  execute(roomName) {
    return this.roomRepository.isRoomExist(roomName);
  }
}

module.exports = IsRoomExist;
