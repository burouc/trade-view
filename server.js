const
  port = 3000,
  path = require('path'),
  express = require('express'),
  http = require('http'),
  app = express(),
  bodyParser = require('body-parser'),
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