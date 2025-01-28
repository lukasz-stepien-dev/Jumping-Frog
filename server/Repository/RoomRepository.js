class RoomRepository {
  constructor() {
    this.rooms = [];
  }

  findByName(name) {
    return this.rooms.find((room) => room.name === name);
  }

  addUser(room, user) {
    room.users.push(user);
  }

  removeUser(room, user) {
    room.users = room.users.filter((u) => u.id !== user.id);
  }

  save(room) {
    const index = this.rooms.findIndex((r) => r.name === room.name);
    if (index !== -1) {
      this.rooms[index] = room;
    } else {
      this.rooms.push(room);
    }
  }

  getRoomByUser(user) {
    return this.rooms.find((room) => room.users.find((u) => u.id === user.id));
  }

  delete(room) {
    this.rooms = this.rooms.filter((r) => r.name !== room.name);
  }

  isRoomExist(roomName) {
    return this.rooms.some((room) => room.name === roomName);
  }
}

module.exports = RoomRepository;
