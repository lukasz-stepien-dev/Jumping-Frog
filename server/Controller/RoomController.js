const CreateRoom = require("../UseCase/CreateRoom");
const GetRoom = require("../UseCase/GetRoom");
const AddUserToRoom = require("../UseCase/AddUserToRoom");
const RemoveRoom = require("../UseCase/RemoveRoom");
const GetRoomByUser = require("../UseCase/GetRoomByUser");

class RoomController {
  constructor(roomRepository) {
    this.roomRepository = roomRepository;
    this.addUserToRoom = new AddUserToRoom(this.roomRepository);
    this.removeRoom = new RemoveRoom(this.roomRepository);
    this.getRoomByUser = new GetRoomByUser(this.roomRepository);
  }

  generateRoomName() {
    let roomName;
    do {
      roomName = Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, "0");
    } while (this.roomRepository.isRoomExist(roomName));
    return roomName;
  }

  joinRoom(socket) {
    socket.on("join", (room, callback) => {
      if (!this.roomRepository.isRoomExist(room)) {
        console.log(
          `🚪: ${socket.id} tried to join room ${room} but it doesn't exist`,
        );
        callback({ error: `Room ${room} doesn't exist.` });
        return;
      }

      if (this.roomRepository.findByName(room).owner === socket.id) {
        console.log(
          `🚪: ${socket.id} tried to join room ${room} but it's the owner`,
        );
        callback({ error: `You're the owner of room ${room}.` });
        return;
      }

      const getRoom = new GetRoom(this.roomRepository);
      if (getRoom.execute(room).users.length > 2) {
        console.log(
          `🚪: ${socket.id} tried to join room ${room} but it's full`,
        );
        callback({ error: `Room ${room} is full.` });
        return;
      }

      console.log(`🚪: ${socket.id} joined room ${room}`);
      this.addUserToRoom.execute(room, socket.id);
      socket.to(room).emit("userJoined", { userId: socket.id });
      socket.join(room);
      callback({ status: "success" });
    });
  }

  createRoom(socket) {
    socket.on("create", (callback) => {
      const roomName = this.generateRoomName();
      const createRoom = new CreateRoom(this.roomRepository);
      createRoom.execute({ name: roomName, owner: socket.id });
      console.log(`🏠: ${socket.id} created room ${roomName}`);
      socket.join(roomName);
      this.addUserToRoom.execute(roomName, socket.id);
      callback({ status: "success", room: roomName });
    });
  }

  handleDisconnect(socket) {
    socket.on("disconnect", () => {
      console.log(`🔌: ${socket.id} disconnected`);
      const room = this.getRoomByUser.execute(socket.id);
      if (room) {
        this.removeRoom.execute(room.name);
        socket.to(room.name).emit("userLeft", { userId: socket.id });
        console.log(`🚪: ${socket.id} left room ${room.name}`);
      }
    });
  }
}

module.exports = RoomController;
