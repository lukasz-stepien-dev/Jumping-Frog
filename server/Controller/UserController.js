const CreateUser = require('../UseCase/CreateUser');

class UserController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    addUser(user) {
        const createUser = new CreateUser(this.userRepository);
        createUser.execute(user);
    }

    getUserByID(userID) {
        return this.userRepository.findByID(userID);
    }

    handleJump(socket) {
        socket.on('jump', (room) => {
            console.log(`👟: ${socket.id} jumped to room ${room}`);
            socket.broadcast.to(room).emit('jump');
        });
    }
}

module.exports = UserController;