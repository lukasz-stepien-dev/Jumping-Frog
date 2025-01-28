class GetRoomByUser {
  constructor(roomRepository) {
    this.roomRepository = roomRepository;
  }

  execute(userID) {
    return this.roomRepository.getRoomByUser(userID);
  }
}

module.exports = GetRoomByUser;
