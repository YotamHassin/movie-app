

// movies.js

const { movieModel, movieSchema } = require('../models/movie');
const categoryModel = require('../models/category').mongooseModel;
const { isAuthenticated } = require('./middleware/express-authentication');

/* const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MyModel = mongoose.model('CONTACTS_COLLECTION' || 'ModelName', new Schema({}, { strict: false }));
 */

function handleError(res, reason, message, code) {
	console.log("ERROR: " + reason);
	res.status(code || 500).json({ "error": message });
}

function Run(app) {
  app.get('/api/movie/getCategories', isAuthenticated, async function(req, res) {
    try {
      //res.status(200).json(['works']);
      let docs = await categoryModel.find().exec();
      res.status(200).json(docs);
    }
    catch (err) {
      handleError(res, err.message, "Failed to get categories.");
    }
  });

  app.get('/api/movie/getMovies', isAuthenticated, async function(req, res) {
    try {
      let docs = await movieModel.find().exec();
      res.status(200).json(docs);
    }
    catch (err) {
      handleError(res, err.message, "Failed to get movies.");
    }
  });
  
  // has id
  app.delete('/api/movie/deleteMovie', isAuthenticated, async function(req, res)  {
    try {
      //var id = req.param('id');
      //var id = req.param.id; 
      var id = req.query.id; 
      console.log('movie/deleteMovie', id);
      
      let docs = await movieModel.deleteOne({ _id: id });
      res.status(200).json(docs.deletedCount);
    }
    catch (err) {
      handleError(res, err.message, "Failed to delete movie.");
    }

  });

  // todo: add the same movie twice.
  app.post("/api/movie/postMovie", isAuthenticated, async function (req, res) {
    try {
      var newMovie = req.body;
      console.log('api/movie/postMovie', newMovie);
      
      //newContact.createDate = new Date();
      if (!newMovie.category.title) {
        let category = await categoryModel.findById(newMovie.category._id).exec();
        newMovie.category=category;
      }

      let docs = await movieModel.create(newMovie);
      res.status(200).json(docs);
      
    }
    catch (err) {
      handleError(res, err.message, "Failed to post movie.");
    }
  });
  
}

module.exports = {
  run: Run,
}