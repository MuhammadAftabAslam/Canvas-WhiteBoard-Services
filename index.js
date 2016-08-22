const config = require('./config/config');

const express  = require('express');
const mongoose = require('mongoose');

const helmet     = require('helmet');
const bodyParser = require('body-parser');
const morgan     = require('morgan');

const routes = require('./routes');
const socketRoutes = require('./socket-routes');

const port = config.server.port;
const app  = express();

require('./libraries/promisify-all')(['mongoose']);

var abc = mongoose.connect(config.mongo.url);
//console.log('abc : ',abc)



app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use('/', routes);

const httpServer = app.listen(port, function() { console.log(`Magic happens on port ${port}`); });
io = require('socket.io')(httpServer);


io.on('connection', socket => {
  socketRoutes.initializeSocket(socket);
});

module.exports = app;
