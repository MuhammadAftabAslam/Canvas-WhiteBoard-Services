const Model = require('../libraries/model');
const ProjectSchema = require('../schemas/project-schema');
const SceneSchema = require('../schemas/scene-schema');
var ObjectId = require('mongoose').Types.ObjectId;


// Business Model layer, in this instance you can manage your business logic. For example,
// if you want to create a scene before creating a person, because you'll end up adding that
// scene to the person, this is the place.

// In libraries/model you have the basic support for RESTful methods. Because this class
// is extending from there, you got that solved.
// You can overwrite extended methods or create custom ones here. Also you can support
// more mongoose functionality like skip, sort etc.

class ProjectModel extends Model {

  getAllProjectsAndScenes(user_id) {
    //user_id = '579668d1937d46b1318e7301'
    return this.SchemaModel.aggregate([{"$match": {"user_id": user_id, "project_hide": false}},
      {
        $lookup: {
          from: 'scenes',
          localField: '_id',
          foreignField: 'project_id',
          as: "scenes"
        }
      },
      //{ $project: {"project_name":1, "all_scenes._id":1, "_id":0} }
    ]).execAsync();
  }

  getScene(id) {
    //user_id = '579668d1937d46b1318e7301'
    //console.log('get scnee : ', id);
    return this.SiblingModel.find({project_id: id, scene_hide: false}).execAsync();
  }

  getScenes(doc, fn) {
    let len = 0;
    doc.map(ele => {
      //console.log('heheheheh',ele);
      this.getScene(ele._id).then(dd => {
        len++;
        ele.scenes = dd;
        if (len == doc.length) {
          //console.log('doc : ',doc);
          fn(doc);
        }
      })
    })
  }
}

module.exports = new ProjectModel(ProjectSchema, SceneSchema);
/*
 * getAllProjectsAndScenes(user_id) {
 //user_id = '579668d1937d46b1318e7301'
 return this.SchemaModel.aggregate([ //{ "$match": { "user_id": user_id} },
 { "$unwind": "$scenes" },
 {$lookup: {
 from: 'scenes',
 localField: '_id',
 foreignField: 'project_id',
 as: "all_scenes"
 }
 },
 { "$unwind": "$scenes" },
 { "$group": {
 "_id": "$_id",
 "products": { "$push": "$scenes" },
 "productObjects": { "$push": "$all_scenes" }
 }}
 ]).execAsync();
 }
 * */