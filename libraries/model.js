class Model {

  constructor(SchemaModel, siblingModel) {
    this.SchemaModel = SchemaModel;
    this.SiblingModel = siblingModel;
  }

  create(input) {
    //console.log('model.js : create : ',input)
    const newSchemaModel = new this.SchemaModel(input);
    return newSchemaModel.saveAsync();
  }

  update(id, updatedModel) {
    return this.SchemaModel
      .findByIdAndUpdate(id, updatedModel, { new: true })
      .execAsync();
  }

  find(query) {
    return this.SchemaModel
      .find(query)
      .execAsync();
  }

  findCallback(query, cb) {
    this.SchemaModel
      .find(query, function (err, res) {
        console.log('findCallback : ', res.length);
        res ? cb(res) : cb();
      })
    //.execAsync(cb);
  }

  findOne(query, populate) {
    return this.SchemaModel
      .findOne(query)
      .populate(populate || '')
      .execAsync();
  }

  findById(id, populate) {
    return this.SchemaModel
      .findById(id)
      .populate(populate || '')
      .execAsync();
  }

  remove(id) {
    return this.SchemaModel
      .findByIdAndRemove(id)
      .execAsync();
  }
}

module.exports = Model;
