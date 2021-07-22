// category.js
// define the schema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaObj = {
  title: {
    type: String,
    required: true
  },
};

const CategorySchema = new Schema(SchemaObj);
const mongooseModel = mongoose.model('category', CategorySchema);

(async function run() {
  // code to run async here
  const data = await mongooseModel.findOne().exec();
  
  // No Data exists, no need to seed.
  if (!data) {
    // todo: move to json
    //let docs = 
    await mongooseModel.create([
      { title: 'Action' }, 
      { title: 'Drama' },
      { title: 'Comedy' },
      { title: 'Else' },
    ]);
  }
  //else { const data = await mongooseModel.deleteMany({"_id":"60f7eb7a952c23372c0d643e"}).exec(); }
})()
  .catch(reason => console.error('catch error in run function', reason))
  //.then(() => console.log('then in run function'))
  //.finally(() => console.log('finally in run function'));


module.exports = { mongooseModel, SchemaObj, CategorySchema };
