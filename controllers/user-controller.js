const Controller = require('../libraries/controller');
const UserModel = require('../models/user-model');

// HTTP layer, in this instance you can manage express request, response and next.
// In libraries/controller you have the basic RESTful methods find, findOne, findById,
// create, update and remove. Because this class is extending from there, you got that solved.
// You can overwrite extended methods or create custom ones here.

class UserController extends Controller {

  authenticate(obj) {
    return this.model.find(obj).then(doc => {
      console.log(doc);
      if (doc.length == 1) {
        doc[0].password = undefined;
        return doc[0];
      }
      else return false;
    })
  }

  register(obj) {
    return this.model.find({
      email: obj.email
    }).then(exist => {
      if (exist.length < 1) {
        return this.model.create({
          username: obj.username,
          email: obj.email,
          password: obj.password,
          token: (new Date()).getTime()
        }).then(doc => {
          if (doc && doc.password) {
            doc.password = undefined;
            console.log('asasa========> >>>>',doc);
            return doc;
          }
          else return false;
        })
      }
      else {
        return false;
      }
    })
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

module.exports = new UserController(UserModel);
