const config = require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const routes = require('./routes');
const socketRoutes = require('./socket-routes');
const multer = require('multer');

const port = config.server.port;
app = express();

require('./libraries/promisify-all')(['mongoose']);

var abc = mongoose.connect(config.mongo.url);
app.use(express.static(__dirname + '/'));
app.set('/uploads/', __dirname + '/uploads/');
//var publicImagePath = app.get('/uploads/');
//console.log('abc : ',abc)


app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use('/', routes);

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.jpg')
  }
});
var upload = multer({ //multer settings
  storage: storage
}).single('file');



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/** API path that will upload the files */
app.post('/upload',upload ,function (req, res) {
  console.log('=====>>>>>>>',req);

  console.log('****************** ###### ******************');
  console.log('=====>>>>>>>',res);
  res.json({status:200,data:req.file})
});

const httpServer = app.listen(port, () => {
  console.log(`Magic happens on port ${port}`);
});
io = require('socket.io')(httpServer);


io.on('connection', socket => {
  socketRoutes.initializeSocket(socket);
});

module.exports = app;
