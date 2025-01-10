const Room = require('../Model/Room');

class CreateRoom {
   constructor(roomRepository) {
       this.roomRepository = roomRepository;
   }

   execute(roomData) {
       const room = new Room(roomData.name, roomData.owner);
       this.roomRepository.save(room);
   }
}

module.exports = CreateRoom;