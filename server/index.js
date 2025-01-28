const express = require("express");
const RoomController = require("./Controller/RoomController");
const RoomRepository = require("./Repository/RoomRepository");
const UserController = require("./Controller/UserController");
const UserRepository = require("./Repository/UserRepository");

const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const socketIO = require("socket.io")(http, {
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
});

// Load environment variables
const dotenv = require("dotenv");
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: envFile });

const PORT = process.env.PORT || 3000;

app.use(cors());

const roomRepository = new RoomRepository();
const userRepository = new UserRepository();

socketIO.on("connection", (socket) => {
  const roomController = new RoomController(roomRepository);
  const userController = new UserController(userRepository);

  userController.addUser(socket.id);
  console.log(`⚡: ${socket.id} user just connected!`);

  roomController.joinRoom(socket);
  roomController.createRoom(socket);
  userController.handleJump(socket);
  userController.handleDisconnect(socket);
  roomController.handleDisconnect(socket);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
