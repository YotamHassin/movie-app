// mongoose.js

//import mongoose from "mongoose";
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

function Run(mongodbRoute, param = null) {
  console.log('Connect To MongooseDB');

  mongoose.connect(mongodbRoute, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ...param
  });

  return mongoose;
}

module.exports = {
  run: Run,
}