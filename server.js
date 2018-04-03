const
  path = require('path'),
  express = require('express'),
  http = require('http'),
  bodyParser = require('body-parser'),
  SocketIo = require('socket.io');

const
  port = 3000,
  app = express(),
  api = require('./server/routes/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set api routes.
app.use('/api', api);

app.use(express.static(path.join(__dirname, 'dist')));

// Server index.html file for all paths that don't match.
app
  .get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

// Set port
app.set('port', port);

const server = http.Server(app);

server
  .listen(port, () => {
    console.log(`App running on localhost:${port}`);
  });

// Setup socket
const
  SocketConnectionService = require(
    './server/services/socket-connection.service'),
  MockDataService = require('./server/services/mock-data.service'),
  socketIo = SocketIo(server),
  socketConnections = {};

// Fill the order book store with mock data.
MockDataService.fillOrderBookStore();

socketIo
  .on('connection', (socket) => {
    Reflect
      .set(
        socketConnections,
        socket.id,
        new SocketConnectionService(socketIo, socket)
      );
  });

socketIo
  .on('disconnect', (socket) => {
    Reflect
      .deleteProperty(
        socketConnections,
        socket.id
      );
  });