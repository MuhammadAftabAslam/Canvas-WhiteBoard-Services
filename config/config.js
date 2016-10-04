const milieu = require('milieu');

const config = milieu('canvas-services', {
  environment: 'dev',
  server: {
    port: 91
  },
  mongo: {
    url: 'mongodb://localhost/canvas-db'
  }
});


module.exports = config;
