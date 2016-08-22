const Model = require('../libraries/model');
const SceneSchema  = require('../schemas/scene-schema');


// Business Model layer, in this instance you can manage your business logic. For example,
// if you want to create a scene before creating a person, because you'll end up adding that
// scene to the person, this is the place.

// In libraries/model you have the basic support for RESTful methods. Because this class
// is extending from there, you got that solved.
// You can overwrite extended methods or create custom ones here. Also you can support
// more mongoose functionality like skip, sort etc.

class SceneModel extends Model {


}

module.exports = new SceneModel(SceneSchema);
