// initData.js

//const mongodbBaseRoute = 'mongodb://localhost/';
const mongodbBaseRoute = 'mongodb://127.0.0.1/';
const dbName = 'my_db';
const accessTokenSecret =
	'some string until i understand what they want from me, don\'t tell no secret';
const PORT = 3000;

module.exports = {
	PORT,
	accessTokenSecret,
	mongodbBaseRoute,
	dbName,
	mongodbRoute: mongodbBaseRoute + dbName
}