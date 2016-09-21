const Controller = require('../libraries/controller');
const SceneModel = require('../models/scene-model');
const fs = require('fs');
const cloudconvert = new (require('cloudconvert'))('I31XHka0wIvcQvn_YYJLYCIuA612OY4Vh-SA_vRPRFxKyMS8uMegbV1ACrwBgR3pYdji1eXd-CEVBjWhqB1k2A');
const audioconcat = require('audioconcat');

// HTTP layer, in this instance you can manage express request, response and next.
// In libraries/controller you have the basic RESTful methods find, findOne, findById,
// create, update and remove. Because this class is extending from there, you got that solved.
// You can overwrite extended methods or create custom ones here.

class SceneController extends Controller {

  // Example of overwriting update method using findOneAndUpdate from mongoose


  decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    return response;
  }


  saveScene(obj, cb) {
    var self = this;
    console.log('save scene controller', obj.audio_data[0][11],app.get('/uploads/'))//this.decodeBase64Image(obj.audio_data));
    if (obj.audio_data[0][11] == 'a') {
      var filename = (new Date()).getTime();
      fs.writeFile(app.get('/uploads/')+filename+'.amr', new Buffer(obj.audio_data[0].split(',')[1], 'base64'), function (err) {
        fs.createReadStream(app.get('/uploads/') + filename +'.amr')
          .pipe(cloudconvert.convert({
            inputformat: 'amr',
            outputformat: 'mp3',
            converteroptions: {
              audio_bitrate: "128",
              audio_frequency: "44100",
              audio_qscale: -1
            }
          }))
          .pipe(fs.createWriteStream(app.get('/uploads/')+ filename +'.mp3'))
          .on('finish', function () {
            console.log('Done!');
            self.model.create({
              name: obj.name,
              project_id: obj.project_id,
              drawing_data: obj.drawing_data,
              audio_data: filename+'.mp3',
              user_id: obj.user_id,
              scene_hide: 0
            }).then(doc => {
              cb(doc);
            })
          });
      });
    }
    else if (obj.audio_data[11] == 'm') {
      var filename = (new Date()).getTime() + '.mp3';
      fs.writeFile(app.get('/uploads/') + filename, new Buffer(obj.audio_data.split(',')[1], 'base64'), function (err) {
        if (!err) {
          self.model.create({
            name: obj.name,
            project_id: obj.project_id,
            drawing_data: obj.drawing_data,
            audio_data: filename,
            user_id: obj.user_id,
            scene_hide: 0
          }).then(doc => {
            cb(doc);
          })
        }
        else cb({error: 'error'});
      });

    }
    else cb({error: 'no match found'})

  }

  getProjectVideo(obj) {
    return this.model.find({
      project_id: obj.project_id,
      scene_hide: false
    }).then(doc => {
      return doc;
    })
  }

  updateScene(obj) {
    return this.model.update(obj._id,{
      name : obj.name,
      project_id: obj.project_id,
      drawing_data: JSON.stringify(obj.drawing_data),
      audio_data: JSON.stringify(obj.audio_data),
      user_id: obj.user_id
    }).then(doc => {
      return doc;
    })
  }

  hideScene(obj) {
    return this.model.update(obj._id,{
      scene_hide : 1
    }).then(doc => {
      return doc;
    })
  }

  concatente(files,fn) {
    audioconcat(files)
      //.output('all.mp3')
      .on('start', function (command) {
        console.log('ffmpeg process started:', command)
      })
      .on('error', function (err, stdout, stderr) {
        console.error('Error:', err)
        console.error('ffmpeg stderr:', stderr)
      })
      .on('end', function (output) {
        console.log('Audio created in:', output)
        fn(output);
      })
  }
  /*
  getAllScenes(query) {
    console.log('allScenes query',query);
    return this.model.find(query).then(doc => {
      console.log('after saved : ');
      return doc;
    });
  }
  */
  // update(req, res, next) {
  // 	this.model.findOneAndUpdate({ _id: req.params.id }, req.body)
  // 	.then(doc => {
  // 		if (!doc) res.status(404).send();
  // 		return res.status(200).json(doc);
  // 	})
  // 	.catch(err => next(err));
  // }

  // Example of a custom method. Remember that you can use this method
  // in a specific route in the router file

  // customMethod(req, res, next) {
  // 	this.model.geoNear([1,3], { maxDistance : 5, spherical : true })
  // 	.then(doc => {
  // 		if (!doc) res.status(404).send();
  // 		return res.status(200).json(doc);
  // 	})
  // 	.catch(err => next(err));
  // }
}

module.exports = new SceneController(SceneModel);
