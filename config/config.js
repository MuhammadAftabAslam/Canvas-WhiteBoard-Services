const milieu = require('milieu');

const config = milieu('canvas-services', {
  environment: 'dev',
  server: {
    port: 8080
  },
  mongo: {
    url: 'mongodb://localhost/canvas-db'
  }
});


module.exports = config;
