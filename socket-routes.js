const controllers = require('./controllers');
const audioconcat = require('audioconcat');
var ffmpeg = require('fluent-ffmpeg')
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
        var allCanvasData = [];
        var audios = [];
        res.map(ele => {
          //console.log('response : ', JSON.parse(ele.drawing_data)[0].actionsets);
          if (ele && ele.drawing_data && JSON.parse(ele.drawing_data)[0].actionsets) {
            var obj = {actionsets: JSON.parse(ele.drawing_data)[0].actionsets};
            allCanvasData.push(obj);
            /*ffmpeg.ffprobe(app.get('/uploads/') + ele.audio_data, function (err, metadata) {
              console.log('---------------------------------------------------------');
              console.log('MetaData : obj :', ele.audio_data, metadata);
            });*/
          }
          else {
            allCanvasData.push([]);
          }
          audios.push(app.get('/uploads/') + ele.audio_data);
        })
        console.log('audios :', audios);
        /*audioconcat(audios,{'b:a':32,ar: 44100}).concat(app.get('/uploads/') + data.project_id+'.mp3')
          .on('start', function (command) {
            console.log('ffmpeg process started:', command)
          })
          .on('error', function (err, stdout, stderr) {
            console.error('-----------------------Error:', err)
            console.error('ffmpeg stderr:', stderr)
          })
          .on('end', function (output) {
            ffmpeg(app.get('/uploads/') + data.project_id + '.mp3').audioBitrate(32).on('end', function () {
              console.log('Finished processing');
              var response = {
                drawing_data: allCanvasData,
                audio_data: data.project_id + '.mp3',
                project_id: data.project_id
              }
              socket.emit('res:project:video', response);
            })
            .run();
            var response = {
              drawing_data: allCanvasData,
              audio_data: data.project_id+'.mp3',
              project_id : data.project_id
            }
            socket.emit('res:project:video', response);
          })
        */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var filter = 'concat:' + audios.join('|')
        ffmpeg(filter,{  })
          .audioBitrate(128)
          .outputOptions('-acodec copy')
          //.outputOptions('-r 32')
          .audioCodec('libmp3lame')
          //.audioFilters('setpts=0.5')
          //.outputOptions('-r 32')
          //.native()
          .on('error', function (err) {
            console.log('An error occurred: ' + err.message);
          })
          .on('end', function () {
            console.log('Merging finished !');
            var response = {
              drawing_data: allCanvasData,
              audio_data: data.project_id + '.mp3',
              project_id: data.project_id
            }


            ffmpeg(app.get('/uploads/') + data.project_id + '.mp3').audioBitrate('128k');
            ffmpeg.ffprobe(app.get('/uploads/') + data.project_id + '.mp3', function (err, data) {
              console.log('file1 metadata:', data);
              socket.emit('res:project:video', response);
            });

          })
          //.mergeToFile('uploads/' + data.project_id + '.mp3', app.get('/uploads/'))
          .save('uploads/' + data.project_id + '.mp3')
          .getAvailableEncoders(function (err, encoders) {
            console.log('Available encoders:');
            //console.dir(encoders);
          });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

/*
ffmpeg(app.get('/uploads/') +  '57dc540828be1a13941f6d9b.mp3').audioBitrate('128k');
*/
/*ffmpeg.ffprobe(app.get('/uploads/') + 'output.mp3', function (err, data) {
  console.log('file1 metadata:', data);
});
*/
