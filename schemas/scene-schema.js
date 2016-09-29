const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SceneSchema = new Schema({
  project_id: {type: String, required: true},
  id: {type: String, required: true},
  drawing_data: {type: String, required: true},
  name: {type: String, required: true},
  audio_data: {type: String, required: true},
  scene_hide: {type: Boolean},
  location: {type: String}
});


module.exports = mongoose.model('Scene', SceneSchema, 'scenes');
