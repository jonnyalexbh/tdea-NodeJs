class SocketHelper {
  constructor(io) {
    this.io = io;
  }

  sendToSocket(socketId, { event, data }) {
    this.io.to(socketId).emit(event, data);
  }

  sendBroadcastMessage({ event, data }) {
    this.io.emit(event, data);
  }
}

module.exports = socketServer => new SocketHelper(socketServer);
