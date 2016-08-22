const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProjectSchema = new Schema({
  project_name: {type: String, required: true},
  project_hide: {type: Boolean},
  user_id: {type: String, required: true}
});


module.exports = mongoose.model('Project', ProjectSchema);
