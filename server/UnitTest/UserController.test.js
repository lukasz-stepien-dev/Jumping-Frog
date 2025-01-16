const UserController = require('../Controller/UserController');
const CreateUser = require('../UseCase/CreateUser');

jest.mock('../UseCase/CreateUser');

describe('UserController', () => {
    let userRepository;
    let userController;
    let socket;

    beforeEach(() => {
        userRepository = {
            findByID: jest.fn(),
        };
        userController = new UserController(userRepository);
        socket = {
            id: 'socket-id',
            on: jest.fn(),
            broadcast: {
                to: jest.fn().mockReturnThis(),
                emit: jest.fn(),
            },
        };
    });

    test('should add a user', () => {
        const user = { id: 'user1', name: 'John Doe' };
        userController.addUser(user);
        expect(CreateUser).toHaveBeenCalledWith(userRepository);
        expect(CreateUser.mock.instances[0].execute).toHaveBeenCalledWith(user);
    });

    test('should get a user by ID', () => {
        const userID = 'user1';
        const user = { id: 'user1', name: 'John Doe' };
        userRepository.findByID.mockReturnValue(user);
        const result = userController.getUserByID(userID);
        expect(result).toEqual(user);
        expect(userRepository.findByID).toHaveBeenCalledWith(userID);
    });

    test('should handle jump event', () => {
        userController.handleJump(socket);
        const jumpHandler = socket.on.mock.calls[0][1];
        jumpHandler('room1');
        expect(socket.broadcast.to).toHaveBeenCalledWith('room1');
        expect(socket.broadcast.emit).toHaveBeenCalledWith('jump');
    });
});