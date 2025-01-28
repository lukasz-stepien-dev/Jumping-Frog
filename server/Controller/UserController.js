const CreateUser = require("../UseCase/CreateUser");
const RemoveUser = require("../UseCase/RemoveUser");

class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.removeUser = new RemoveUser(this.userRepository);
  }

  addUser(user) {
    const createUser = new CreateUser(this.userRepository);
    createUser.execute(user);
    console.log(`👤: User ${user} created`);
  }

  getUserByID(userID) {
    console.log(`🔍: Fetching user with ID ${userID}`);
    return this.userRepository.findByID(userID);
  }

  handleJump(socket) {
    socket.on("jump", (room) => {
      console.log(`👟: ${socket.id} jumped to room ${room}`);
      socket.broadcast.to(room).emit("jump");
    });
  }

  handleDisconnect(socket) {
    socket.on("disconnect", () => {
      console.log(`🔌: ${socket.id} user deleted`);
      this.removeUser.execute(socket.id);
    });
  }
}

module.exports = UserController;
