// note.js
// define the schema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { CategorySchema } = require('./category');

const SchemaObj = {
	title: {
		type: String,
		required: true
	},

	category: {
		type: CategorySchema,
		required: true
	},

	imdb: {
		type: String,
		required: true
	},

	link: {
		type: String,
		required: true
  },
    
  date: { type: Date, default: Date.now }

};

const movieSchema = new Schema(SchemaObj);
const movieModel = mongoose.model('movie', movieSchema);

module.exports = {movieSchema, movieModel};