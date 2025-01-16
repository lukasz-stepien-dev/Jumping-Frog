const RoomController = require('../Controller/RoomController');
const CreateRoom = require('../UseCase/CreateRoom');
const GetRoom = require('../UseCase/GetRoom');
const AddUserToRoom = require('../UseCase/AddUserToRoom');

jest.mock('../UseCase/CreateRoom');
jest.mock('../UseCase/GetRoom');
jest.mock('../UseCase/AddUserToRoom');

describe('RoomController', () => {
    let roomRepository;
    let roomController;
    let socket;

    beforeEach(() => {
        roomRepository = {
            isRoomExist: jest.fn(),
            findByName: jest.fn()
        };
        roomController = new RoomController(roomRepository);
        socket = {
            id: 'socket-id',
            on: jest.fn(),
            to: jest.fn().mockReturnThis(),
            emit: jest.fn(),
            join: jest.fn()
        };
    });

    test('should generate a unique room name', () => {
        roomRepository.isRoomExist.mockReturnValue(false);
        const roomName = roomController.generateRoomName();
        expect(roomName).toBeDefined();
        expect(roomRepository.isRoomExist).toHaveBeenCalled();
    });

    test('should handle joinRoom event when room does not exist', () => {
        roomRepository.isRoomExist.mockReturnValue(false);
        const callback = jest.fn();

        roomController.joinRoom(socket);
        const joinHandler = socket.on.mock.calls[0][1];
        joinHandler('room1', callback);

        expect(callback).toHaveBeenCalledWith({ error: 'Room room1 doesn\'t exist.' });
    });

    test('should handle joinRoom event when user is the owner', () => {
        roomRepository.isRoomExist.mockReturnValue(true);
        roomRepository.findByName.mockReturnValue({ owner: 'socket-id' });
        const callback = jest.fn();

        roomController.joinRoom(socket);
        const joinHandler = socket.on.mock.calls[0][1];
        joinHandler('room1', callback);

        expect(callback).toHaveBeenCalledWith({ error: 'You\'re the owner of room room1.' });
    });

    test('should handle joinRoom event when room is full', () => {
        roomRepository.isRoomExist.mockReturnValue(true);
        roomRepository.findByName.mockReturnValue({ owner: 'other-id' });
        GetRoom.mockImplementation(() => ({
            execute: () => ({ users: ['user1', 'user2'] })
        }));
        const callback = jest.fn();

        roomController.joinRoom(socket);
        const joinHandler = socket.on.mock.calls[0][1];
        joinHandler('room1', callback);

        expect(callback).toHaveBeenCalledWith({ error: 'Room room1 is full.' });
    });

    test('should handle joinRoom event successfully', () => {
        roomRepository.isRoomExist.mockReturnValue(true);
        roomRepository.findByName.mockReturnValue({ owner: 'other-id' });
        GetRoom.mockImplementation(() => ({
            execute: () => ({ users: ['user1'] })
        }));
        const callback = jest.fn();

        roomController.joinRoom(socket);
        const joinHandler = socket.on.mock.calls[0][1];
        joinHandler('room1', callback);

        expect(socket.join).toHaveBeenCalledWith('room1');
        expect(callback).toHaveBeenCalledWith({ status: 'success' });
    });

    test('should handle createRoom event successfully', () => {
        roomRepository.isRoomExist.mockReturnValue(false)l
        const callback = jest.fn();

        roomController.createRoom(socket);
        const createHandler = socket.on.mock.calls[0][1];
        createHandler(callback);

        expect(socket.join).toHaveBeenCalled();
        expect(callback).toHaveBeenCalledWith(expect.objectContaining({ status: 'success' }));
    });
});