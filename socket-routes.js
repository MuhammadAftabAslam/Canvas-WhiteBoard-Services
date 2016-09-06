const controllers = require('./controllers');

exports.initializeSocket = function (socket) {
  socket.on('ping', data => {
    console.log(`ping : `, data);
  })
    .on('req:save:scene', data => {
      controllers.scene.saveScene(data,res => {
        console.log('res:save:scene : ');
        socket.emit('res:save:scene', res);
      });
    })
    .on('req:project:video', data => {
      controllers.scene.getProjectVideo(data).then(res => {
        console.log('res:project:video : ');
        socket.emit('res:project:video', res);
      });
    })
    .on('req:hide:scene', data => {
      controllers.scene.hideScene(data).then(res => {
        console.log('res:hide:scene : ');
        socket.emit('res:hide:scene', res);
      });
    })
    .on('req:audio:concatenate', data => {
      controllers.scene.concatente(data,res => {
        console.log('res:audio:concatenate: ');
        socket.emit('res:audio:concatenate', res);
      });
    })
    .on('req:update:scene', (data) => {
      //console.log('req:update:scene : ', data);
      controllers.scene.updateScene(data,res => {
        console.log('res:update:scene : ', res);
        socket.emit('res:update:scene', res);
      });
    })
    .on('req:all:scenes', (data) => {
      //console.log('req:all:scenes : ', data);
      controllers.project.getAllScenes(data,res => {
        console.log('res:all:scenes : ', res);
        socket.emit('res:all:scenes', res);
      });
    })
    .on('req:login', (data) => {
      //console.log('req:login', data);
      controllers.user.authenticate(data).then(res => {
        console.log('res:login', res);
        socket.emit('res:login', res);
      });
    })
    .on('req:register', (data) => {
      console.log('req:register on : ', data);
      controllers.user.register(data).then(res => {
        console.log('res:register on : ', res);
        socket.emit('res:register', res);
      });
    })
    .on('req:project:create', (data) => {
      console.log('req:project:create on : ', data);
      controllers.project.createProject(data).then(res => {
        console.log('res:project:create on : ', res);
        socket.emit('res:project:create', res);
      });
    })
    .on('req:project:hide', (data) => {
      console.log('req:project:hide : ', data);
      controllers.project.hideProject(data).then(res => {
        console.log('res:project:hide : ', res);
        socket.emit('res:project:hide', res);
      });
    });
}



