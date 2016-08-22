const Controller = require('../libraries/controller');
const ProjectModel = require('../models/project-model');

// HTTP layer, in this instance you can manage express request, response and next.
// In libraries/controller you have the basic RESTful methods find, findOne, findById,
// create, update and remove. Because this class is extending from there, you got that solved.
// You can overwrite extended methods or create custom ones here.

class ProjectController extends Controller {


  createProject(obj) {
    return this.model.create({
      project_name: obj.project_name,
      project_hide: 0,
      user_id: obj.user_id
    }).then(doc => {
      if (doc) {
        return doc;
      }
      else return false;
    })
  }

  hideProject(obj) {
    return this.model.update(obj._id,{
      project_hide : 1
    }).then(doc => {
      if (doc) {
        return doc;
      }
      else return false;
    })
  }


  getAllScenes(obj, fn) {

    if (obj.user_id) {
      this.model.getAllProjectsAndScenes(obj.user_id).then(doc => {
        if (doc.length) {
          this.model.getScenes(doc, completeData => {
            //console.log('completeData : ', completeData)
            fn(completeData);
          });
        }
        else {
          console.log('completeData12 : ',doc)
          fn([]);
        }
      });
    }
    else {
      console.log('completeData12 3: ')
      fn([]);
    }
  }

  /*find(req, res, next) {
   console.log('find : ');
   this.model.create({title:'aftab',body:'anything'})
   .then(doc => {
   console.log('doc : ',doc);
   if (!doc) {
   res.status(404).send();
   }
   return res.status(200).json('');
   })
   }*/

  // Example of overwriting update method using findOneAndUpdate from mongoose

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

module.exports = new ProjectController(ProjectModel);
