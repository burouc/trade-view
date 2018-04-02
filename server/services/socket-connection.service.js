class SocketConnectionService {
  constructor (io, client) {
    this.io = io;
    this.client = client;
  }
}

module.exports = SocketConnectionService;