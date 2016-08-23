const Controller = require('../libraries/controller');
const SceneModel = require('../models/scene-model');

// HTTP layer, in this instance you can manage express request, response and next.
// In libraries/controller you have the basic RESTful methods find, findOne, findById,
// create, update and remove. Because this class is extending from there, you got that solved.
// You can overwrite extended methods or create custom ones here.

class SceneController extends Controller {

  // Example of overwriting update method using findOneAndUpdate from mongoose

  saveScene(obj) {
    console.log('save scnee controller');
    return this.model.create({
      name : obj.name,
      project_id: obj.project_id,
      drawing_data: JSON.stringify(obj.drawing_data),
      audio_data: JSON.stringify(obj.audio_data),
      user_id: obj.user_id,
      scene_hide : 0
    }).then(doc => {
      return doc;
    })
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
