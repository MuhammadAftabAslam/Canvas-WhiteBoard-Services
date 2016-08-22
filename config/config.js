const milieu = require('milieu');

const config = milieu('canvas-services', {
  environment: 'dev',
  server: {
    port: 8080
  },
  mongo: {
    url: 'mongodb://canvas-db'
  }
});


module.exports = config;
